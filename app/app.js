'use strict';
const axios = require('axios');

// =================================================================================
// App Configuration
// =================================================================================

const {App} = require('jovo-framework');

const config = {
    logging: true,
    analytics: {
        services: {
            BotanalyticsAlexa: {
                key: process.env.BOTANALYTICS_TOKEN
            }
        },
    },
};

const app = new App(config);
let Client = require('../proxy/Client')

let proxy = new Client();

// =================================================================================
// App Logic
// =================================================================================

app.setHandler({
    'LAUNCH': function () {
        // this.ask('Fetching pending batches.');
        // this.toIntent('feedbackIntent','Fetching pending batches.')
        this.toIntent('fetchingBatchFeedbackIntent');
    },

    'HelloIntent': function () {
        this.tell('Hello welcome to auto pay');
    },

    'PendingBatchIntents': function () {
        this.ask('Fetching pending batches.');
    },

    'FetchPendingBatchFeedback': function () {
        //fetch pending batches
       //let batches =  proxy.getBatches(corporateCode);

        axios.get('https://reqres.in/api/users?page=2')
            .then(response => {
                //read out all batches
                let speech = this.speechBuilder()
                for (let i = 0; i < 5; i++) {
                    speech.addText('Batch name is tobe.')
                    speech.addBreak('300ms')

                }
                speech.addText('Which batch do you want to commit?');
                this.ask(speech);

                //ask what batch to commit
                // this.ask('Which batch do you want to commit?');
                // this.toIntent('commitBatch');
            })
            .catch(error => {
                console.log(error);
            });
    },
    'CommitBatchIntent': function (name) {
        let speech = 'committing batch ${name.value}?';
        let reprompt = 'Please answer with yes or no.';
        this.followUpState('CommitBatchState')
            .ask(speech, reprompt);

    },
    'CommitBatchState': {
        'YesIntent': function() {
            // proxy.commitBatch(corporateCode, batchId, passCode);

            axios.get('https://reqres.in/api/users?page=2')
                .then(response => {
                    //successful
                    this.ask('Batch committed successfully');
                })
                .catch(error => {
                    console.log(error);
                });
        },

        'NoIntent': function() {
            // Do something
        },

        'Unhandled': function() {
            let speech = 'You need to answer with yes, to play a game.';
            let reprompt = 'Please answer with yes or no.';
            this.ask(speech, reprompt);
        },
    },

    'Unhandled': function () {
        // Triggered when the requested intent could not be found in the handlers
        this.tell('Your intentions cannot be fully deciphered, please try again');
        this.toIntent('LAUNCH');
    },


    'MyNameIsIntent': function (name) {
        this.tell('Hey ' + name.value + ', nice to meet you!');
    },

    'NEW_USER': function() {
        // Triggered when a user opens your app for the first time
    },

    'END': function() {
        let reason = this.getEndReason();

        // For example, log
        console.log(reason);

        this.tell('Goodbye!');
    }
});

module.exports.app = app;
