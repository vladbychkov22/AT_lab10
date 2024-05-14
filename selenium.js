const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Шлях до chromedriver
const chromeDriverPath = 'webdriver\chromedriver.exe';

// Налаштування опцій ChromeDriver
let options = new chrome.Options();

// Задав властивість webdriver.chrome.driver до шляху вашого chromedriver
process.env['webdriver.chrome.driver'] = chromeDriverPath;

// URL хаба
const hubUrl = 'http://localhost:4444/wd/hub';

async function runTest() {
    let driver = await new Builder()
        .forBrowser('chrome')
        .usingServer(hubUrl) // Вказуємо використовувати віддалений драйвер через хаб
        .setChromeOptions(options)
        .build();

    try {
        // Кроки тесту
        await driver.get('https://automationexercise.com/');
        await driver.findElement(By.css('a[href="/login"]')).click();
        await driver.wait(until.titleIs('Automation Exercise - Signup / Login'), 5000);
        await driver.findElement(By.name('email')).sendKeys('andresplay80@gmail.com');
        await driver.findElement(By.name('password')).sendKeys('48SFkxRm25', Key.RETURN);
        await driver.wait(until.titleIs('Automation Exercise'), 5000);
        let userName = await driver.findElement(By.css('#header > div > div > div > div.col-sm-8 > div > ul > li:nth-child(10) > a > b')).getText();
        console.log("Юзер :", userName);
        if (!userName.includes('Andrii')) {
            throw new Error("Ім'я користувача не відповідає очікуваному.");
        }
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        console.log('Все добре тут вихід.');
        // поки не закривати браузер 
        // await driver.quit();
    }
}

runTest();
