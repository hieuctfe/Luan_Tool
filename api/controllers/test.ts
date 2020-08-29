import 'dotenv/config';
import {IgApiClient, IgCheckpointError} from '../../src';
import Bluebird = require('bluebird');
import inquirer = require('inquirer');

(async () => {
    const ig = new IgApiClient();
    console.log("huong.lien331");
    ig.state.generateDevice("huong.lien331");
    Bluebird.try(async () => {
        await ig.account.login("huong.lien331", "76574348");
        // console.log(auth);
    }).catch(IgCheckpointError, async () => {
        console.log(ig.state.checkpoint); // Checkpoint info here
        // await ig.challenge.auto(true); // Requesting sms-code or click "It was me" button
        await ig.challenge.selectVerifyMethod(1)
        console.log(ig.state.checkpoint); // Challenge info here
        const {code} = await inquirer.prompt([
            {
                type: 'input',
                name: 'code',
                message: 'Enter code',
            },
        ]);
        console.log(await ig.challenge.sendSecurityCode(code));
    });
})();
