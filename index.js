#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;
let correctAnswerCount = 0;

// 間隔 2秒
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

// イントロ画面
async function welcome() {
  const rainbowTItle = chalkAnimation.rainbow(
    'BFP のことどのぐらい知ってる？ \n'
  );

  await sleep();
  rainbowTItle.stop();

  console.log(`
    ${chalk.underline.bold('遊び方')}\n
    BFP 知識ゲームです。
    質問ひとつでも間違ったら ${chalk.red('殺されます')}。
    なるべく正しく答えるよう...
  `);
}

// プレイヤー名
async function askName() {
  const answers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'お名前を入力してください。',
    default() {
      return `${chalk.hex('#FFA500')('プレイヤー')}`;
    }
  });

  playerName = answers.player_name;
}

// 質問集
async function question1() {
  const answers = await inquirer.prompt({
    name: 'question_1',
    type: 'list',
    message: `BFPとは${chalk.underline.blue('〇〇〇')}の略語\n`,
    choices: [
      'Basement Factory Prodvctions',
      'Basement Factory Productions',
      'Basememt Factory Productions',
      'Basement Factory Production'
    ]
  });

  return handleAnswer(answers.question_1 == 'Basement Factory Productions');
}

async function question2() {
  const answers = await inquirer.prompt({
    name: 'question_2',
    type: 'list',
    message: `BFPの${chalk.underline.blue('設立日')}は\n`,
    choices: [
      '2006年3月3日',
      '2003年3月3日',
      '2007年7月7日',
      '2003年6月6日'
    ]
  });

  return handleAnswer(answers.question_2 == '2003年6月6日');
}

async function question3() {
  const answers = await inquirer.prompt({
    name: 'question_3',
    type: 'list',
    message: `エンジニア島にいる${chalk.underline.blue('エンジニア人数')}は\n`,
    choices: [
      '6人',
      '7人',
      '8人',
      '9人'
    ]
  });

  return handleAnswer(answers.question_3 == '8人');
}

// 正かどうか判定
async function handleAnswer(isCorrect) {
  const spinner = createSpinner('確認中...').start();
  await sleep();

  if(isCorrect) {
    correctAnswerCount++;
    spinner.success({ text: `さすが ${chalk.hex('#FFA500')(playerName)}さん! 正解です。\n` });
  } else {
    spinner.error({ text: `😥 残念、負けちゃったね..${chalk.hex('#FFA500')(playerName)}さん。\n \n 正解数 = ${chalk.green(correctAnswerCount + '個')}でした。もっと頑張りましょう。\n` });
    process.exit(1);
  }
}

// 全部正しい場合の画面
async function winner() {
  console.clear();
  const msg = "CONGRATULATIONS ! ! !";

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await winner();