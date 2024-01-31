import '@testing-library/jest-dom';
import puppeteer from 'puppeteer';

jest.setTimeout(10000); // Set the timeout to 10 seconds (adjust as needed)

describe('show/hide an event details', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250, // slow down by 250ms,
      timeout: 0 // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(async () => {
    await browser.close();
  });

  test('An event element is collapsed by default', async () => {
    // Check if the event details are initially collapsed
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    // Click on the "Details" button to expand the event
    await page.click('.event .details-btn');

    // Check if the event details are now defined (expanded)
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide details', async () => {
    // Click on the "Details" button again to collapse the event
    await page.click('.event .details-btn');

    // Check if the event details are now collapsed (null)
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });
});
