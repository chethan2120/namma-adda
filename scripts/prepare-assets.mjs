import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import ffmpegPath from "ffmpeg-static";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const picturesDir = path.join(root, "Pictures");
const videosDir = path.join(root, "Videos");
const publicDir = path.join(root, "public");
const foodDir = path.join(publicDir, "images", "food");
const posterDir = path.join(foodDir, "posters");
const videoOutDir = path.join(publicDir, "videos");
const logoSrc = path.join(
  process.env.USERPROFILE ?? "",
  ".cursor",
  "projects",
  "c-Users-A-M-Chethan-Kumar-Desktop-Project-Namma-dabba",
  "assets",
  "image-8cad833d-6d0c-4bfb-a101-57ae6b407dbe.png",
);

const selectedImages = [
  "AAD00805.JPG",
  "AAD00810.JPG",
  "AAD00812.JPG",
  "AAD00814.JPG",
  "AAD00816.JPG",
  "AAD00820.JPG",
  "AAD00821.JPG",
  "AAD00824.JPG",
  "AAD00827.JPG",
  "AAD00828.JPG",
  "AAD00833.JPG",
  "AAD00836.JPG",
  "AAD00840.JPG",
  "AAD00844.JPG",
  "AAD00845.JPG",
  "AAD00848.JPG",
  "AAD00851.JPG",
  "AAD00857.JPG",
  "AAD00858.JPG",
  "AAD00861.JPG",
  "AAD00862.JPG",
  "AAD00864.JPG",
  "AAD00865.JPG",
];

const selectedVideos = [
  "00000-mts-to-mp4.mp4",
  "00006-mts-to-mp4.mp4",
  "00005-mts-to-mp4.mp4",
  "00021-mts-to-mp4.mp4",
];

const report = {
  picturesFound: [],
  videosFound: [],
  imagesCopied: [],
  imagesMissing: [],
  videos: [],
  logo: "pending",
};

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function ffmpeg(args) {
  return new Promise((resolve, reject) => {
    if (!ffmpegPath) {
      reject(new Error("ffmpeg-static did not provide a binary"));
      return;
    }
    const child = spawn(ffmpegPath, args, { windowsHide: true });
    let stderr = "";
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve(stderr);
      else reject(new Error(stderr.slice(-1000)));
    });
  });
}

async function prepareLogo() {
  if (!fs.existsSync(logoSrc)) {
    report.logo = `missing at ${logoSrc}`;
    return;
  }
  const { data, info } = await sharp(logoSrc).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const max = Math.max(data[i], data[i + 1], data[i + 2]);
    if (max < 28) data[i + 3] = 0;
    else if (max < 52) data[i + 3] = Math.round(((max - 28) / 24) * data[i + 3]);
  }
  const cleaned = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim()
    .png()
    .toBuffer();

  await sharp(cleaned).resize({ width: 1000, withoutEnlargement: true }).png().toFile(path.join(publicDir, "images", "logo.png"));
  await sharp(cleaned)
    .resize(256, 256, {
      fit: "contain",
      background: { r: 240, g: 39, b: 29, alpha: 1 },
    })
    .png()
    .toFile(path.join(publicDir, "favicon.png"));
  report.logo = "written";
}

async function prepareImages() {
  for (const name of selectedImages) {
    const source = path.join(picturesDir, name);
    if (!fs.existsSync(source)) {
      report.imagesMissing.push(name);
      continue;
    }
    const dest = path.join(foodDir, name.replace(/\.JPG$/i, ".jpg"));
    const wide = name === "AAD00844.JPG" || name === "AAD00864.JPG" || name === "AAD00857.JPG";
    await sharp(source)
      .rotate()
      .resize(wide ? 2000 : 1600, wide ? 2000 : 1600, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(dest);
    const stat = fs.statSync(dest);
    report.imagesCopied.push({ file: path.basename(dest), bytes: stat.size });
  }
}

async function prepareVideos() {
  for (const name of selectedVideos) {
    const source = path.join(videosDir, name);
    const entry = { file: name, status: "pending" };
    report.videos.push(entry);
    if (!fs.existsSync(source)) {
      entry.status = "missing";
      continue;
    }
    const poster = path.join(posterDir, name.replace(/\.mp4$/i, ".jpg"));
    const dest = path.join(videoOutDir, name);
    try {
      try {
        await ffmpeg(["-y", "-ss", "1", "-i", source, "-frames:v", "1", "-q:v", "3", poster]);
      } catch {
        await ffmpeg(["-y", "-ss", "0", "-i", source, "-frames:v", "1", "-q:v", "3", poster]);
      }
      await ffmpeg([
        "-y",
        "-i",
        source,
        "-t",
        "18",
        "-vf",
        "scale=960:-2",
        "-c:v",
        "libx264",
        "-preset",
        "veryfast",
        "-crf",
        "28",
        "-c:a",
        "aac",
        "-b:a",
        "96k",
        "-movflags",
        "+faststart",
        dest,
      ]);
      entry.status = "ready";
      entry.bytes = fs.statSync(dest).size;
      entry.poster = path.basename(poster);
    } catch (error) {
      entry.status = "failed";
      entry.error = error instanceof Error ? error.message : String(error);
    }
  }
}

fs.mkdirSync(foodDir, { recursive: true });
fs.mkdirSync(posterDir, { recursive: true });
fs.mkdirSync(videoOutDir, { recursive: true });
fs.mkdirSync(path.join(publicDir, "images"), { recursive: true });

report.picturesFound = walk(picturesDir).map((file) => path.basename(file));
report.videosFound = walk(videosDir).map((file) => path.basename(file));

await prepareLogo();
await prepareImages();
await prepareVideos();

fs.writeFileSync(path.join(root, "scripts", "asset-report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify({
  pictures: report.picturesFound.length,
  videos: report.videosFound.length,
  imagesCopied: report.imagesCopied.length,
  imagesMissing: report.imagesMissing,
  logo: report.logo,
  videos: report.videos,
}, null, 2));
