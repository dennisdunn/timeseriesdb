const format = require('util').format;
const moment = require('moment');

module.exports = {

    toQuery: (ident, sample) => {
        return {
            ident,
            timestamp: moment(sample.timestamp).utc().startOf('d').toDate()
        };
    },

    toUpdateDocument: sample => {
        const t = moment(sample.timestamp).utc();
        const prop = format("%s.%s.%s", t.hours(), t.minutes(), Math.floor(t.seconds()));
        const update = { $set: {} };
        update['$set'][prop] = sample.value;

        return update;
    },

    toSeries: doc => {
        const samples = [];
        this.getNumericKeys(doc).forEach((h) => {
            this.getNumericKeys(doc[h]).forEach((m) => {
                this.getNumericKeys(doc[h][m]).forEach((s) => {
                    const timestamp = moment(doc.timestamp).add(h, 'h').add(m, 'm').add(s, 's').toDate();
                    const value = doc[h][m][s];
                    const len = samples.push({ ident: doc.ident, timestamp, value });
                });
            });
        });
        return samples;
    },

    getNumericKeys: doc => {
        let keys = Object.keys(doc)
            .filter((key) => Number.isInteger(+key));
        keys.sort();
        return keys;
    }
};
