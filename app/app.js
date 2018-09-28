'use strict';
const axios = require('axios');

// =================================================================================
// App Configuration
// =================================================================================

const {App} = require('jovo-framework');

const config = {
    logging: true,
};

const app = new App(config);


// =================================================================================
// App Logic
// =================================================================================

app.setHandler({
    'LAUNCH': function () {
        // this.ask('Fetching pending batches.');
        // this.toIntent('feedbackIntent','Fetching pending batches.')
        this.toIntent('fetchingBatchFeedbackIntent');
    },

    'fetchingBatchFeedbackIntent': function () {
        this.ask('Fetching pending batches.');
    },

    'checkPendingBatches': function () {
        //fetch pending batches
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
    'commitBatch': function (name) {
        //fetch pending batches
        // this.ask(`committing batch ${name.value}`);
        axios.get('https://reqres.in/api/users?page=2')
            .then(response => {
                //successful
                this.ask('Batch committed successfully');
            })
            .catch(error => {
                console.log(error);
            });
    },

    'Unhandled': function () {
        // Triggered when the requested intent could not be found in the handlers variable
    },


    'MyNameIsIntent': function (name) {
        this.tell('Hey ' + name.value + ', nice to meet you!');
    },
});

module.exports.app = app;
