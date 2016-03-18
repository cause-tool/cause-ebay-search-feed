'use strict';

const chalk = require('chalk');
const causeFeed = require('cause-feed');


function main(step, context, config, input, done) {
	// construct rss feed url
	const query = config.search.replace(/ +/ig, '+');
	config.url = `http://www.ebay.${config.tld}/sch/i.html?_nkw=${query}&_rss=1`;

	// use `causeFeed` block functionality
	causeFeed.main(step, context, config, input, (err, output, decision) => {
		// output from `causeFeed` block
		const input = output;

		if (!output) {
			return done(new Error('no input received'));
		}

		input.forEach((item) => {
			console.log('— ', item.title);
			console.log('  ', chalk.green(item.link));
		});

		// pass arguments on to callback
		done(err, input, decision);
	});
}


module.exports = {
	main: main,
	defaults: {
		config: {
			tld: 'de',
			search: 'epson perfection v800'
		},
		data: causeFeed.defaults.data,
		description: 'new ebay search results'
	}
};
