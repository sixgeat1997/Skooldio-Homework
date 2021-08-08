let stdin = process.openStdin();

const main = () => {
  let bet = 0;
  console.log("node start");
  console.log("Please put your bet");

  stdin.addListener("data", async (key) => {
    bet = key;
    let user = [];
    let dealer = [];
    for (let i = 0; i < 2; i++) {
      const tempUser = await randomCard();
      user.push(tempUser);
      const tempDealer = await randomCard();
      dealer.push(tempDealer);
    }

    console.log(`You got ${user[0]["str"]}, ${user[1]["str"]}`);
    console.log(`The dealer got ${dealer[0]["str"]}, ${dealer[1]["str"]}`);

    const results = await checkWinner(user, dealer, bet);
    console.log(results);
    console.log("Wanna play more (Yes/No)?");
    stdin.addListener("data", async (str) => {
      if (str.toString().toLowerCase() == "yes") {
        stdin.removeListener('data', main)
      } else {
        stdin.destroy();
      }
    });
  });
};

const checkWinner = (player, banker, bet) => {
  return new Promise((resolve, rejcet) => {
    try {
      const user = (player[0]["value"] + player[1]["value"]) % 10;
      const dealer = (banker[0]["value"] + banker[1]["value"]) % 10;
      if (user > dealer) {
        resolve(`You won!!!, received ${bet} chips`);
      } else if (user == dealer) {
        resolve(`equal`);
      } else {
        resolve(`You lost!!!`);
      }
    } catch (error) {
      rejcet(error);
    }
  });
};

const randomCard = () => {
  return new Promise((resolve, reject) => {
    const number = Math.floor(Math.random() * 13 + 1);
    const symbol = Math.floor(Math.random() * 4 + 1);

    let strCard = "";
    let strCardObj = {
      str: "",
      letter: 0,
      value: 0,
    };

    switch (symbol) {
      case 1:
        strCard = "Clubs-";
        strCardObj.str = "Clubs-";
        strCardObj.letter = 0;
        break;
      case 2:
        strCard = "Diamond-";
        strCardObj.str = "Diamond-";
        strCardObj.letter = 1;
        break;
      case 3:
        strCard = "Hearts-";
        strCardObj.str = "Hearts-";
        strCardObj.letter = 2;
        break;
      case 4:
        strCard = "Spade-";
        strCardObj.str = "Spade-";
        strCardObj.letter = 3;
        break;
      default:
        "";
        break;
    }
    if ([1, 11, 12, 13].indexOf(number) >= 0) {
      strCardObj.value = 0;
      switch (number) {
        case 1:
          strCard += "One";
          strCardObj.str += "One";
          break;
        case 11:
          strCard += "Jack";
          strCardObj.str += "Jack";
          break;
        case 12:
          strCard += "Queen";
          strCardObj.str += "Queen";
          break;
        case 13:
          strCard += "King";
          strCardObj.str += "King";
          break;

        default:
          break;
      }
    } else {
      strCard += number;
      strCardObj.str += number;
      strCardObj.value = number;
    }
    resolve(strCardObj);
    // return strCardObj;
  });
};

main();
