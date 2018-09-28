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
        this.toIntent('checkPendingBatches');
    },

    // 'HelloWorldIntent': function() {
    //     this.ask('Hello World! What\'s your name?', 'Please tell me your name.');
    // },
    'checkPendingBatches': function () {
        //fetch pending batches
        axios.get('https://reqres.in/api/users?page=2')
            .then(response => {
                console.log(response.data);
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
                this.toIntent('commitBatch');
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
                console.log(response.data);
                //successful
                this.ask('Batch committed successfully');
            })
            .catch(error => {
                console.log(error);
            });
    },

    'feedbackIntent': function (data) {

    },


    'MyNameIsIntent': function (name) {
        this.tell('Hey ' + name.value + ', nice to meet you!');
    },
});

module.exports.app = app;
