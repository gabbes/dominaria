const fs = require('fs');
const test = require('tape');
const cards = require('../src/data/dominaria.json');

test('validate card data object', function(t) {
  // Register four tests per card
  t.plan(cards.length * 4);

  cards.forEach(card => {
    console.log(`\n-> ${card.name} <-`);

    // Test if there exists a .jpg file by this cards name
    console.log('   image file - exists?');
    t.true(fs.existsSync(`./src/assets/cards/${card.name}.jpg`));

    // Test if card rarity value is of allowed values
    console.log(`   rarity (${card.rarity}) - is allowed?`);
    t.true(['C', 'U', 'R', 'M'].includes(card.rarity));

    // Test if card color value is of allowed values
    console.log(`   color (${card.color}) - is allowed?`);
    t.true(['W', 'U', 'B', 'R', 'G', 'A', 'M'].includes(card.color));

    // Test if card score is a float number between 0 and 5
    console.log(`   score (${card.score}) - is float in range 0-5?`);
    t.true(parseFloat(card.score) && (card.score >= 0 && card.score <= 5));
  });
});
