const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (req, res) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

    await page.goto("https://developer.chrome.com/");

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // Type into search box
    const logStatement = "hello world"
    
    // Send a JSON response
    res.json({ message: logStatement , ip: req.ip});
  } catch (e) {
    console.error(e);
    
    // Send a JSON error message
    res.json({ error: `Something went wrong while running Puppeteer: ${e}` });
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
