const URL = 'http://127.0.0.1:8080'
context('Memotest', () => {

  before(() => {
    cy.visit(URL);
  });

  describe('sets up memotest', () => {
    const TOTAL_SQUARES = 12


    it('moves should be 0', () => {
      cy.get('#moves').contains(`0`);
    });
  
      it('timer should be 0', () => {
      cy.get('#timer').contains(`0`);
    });
    
    it('board should have all squares', () => {
      cy.get('#board').find('.square').should('have.length', TOTAL_SQUARES);
    });

    it('start game button should be visible before starting the game', () => {
      cy.get('#start-game-btn').should('be.visible');
    });

    it('board should be hidden before pressing start game button', () => {
      cy.get('#board').should('not.be.visible');
    })

    it('start game button should be hidden after starting the game', () => {
      cy.get('#start-game-btn').click();
      cy.get('#start-game-btn').should('not.be.visible');
    })

    it('board should be visible after pressing start game button', () => {
      cy.get('#board').should('be.visible');
    })


    it('squares should be randomly generated', () => {
      cy.get('.square').then((squares) => {
        let firstClasses = [];
        squares.each(function (i, squares) {
          firstClasses.push(squares.className);
        });

        cy.visit(URL);

        let secondClasses = [];
        cy.get('.square').then(newSquares => {
          newSquares.each(function (i, squares) {
            secondClasses.push(squares.className);
          });

          cy.wrap(firstClasses).should('not.deep.equal', secondClasses);

        });
      });
    });



    describe('solves memotest', () => {

      it('chooses a wrong combination', () => {
        let pairsMap, pairsList;
        cy.get('#start-game-btn').click();
        cy.get('.square').then(squares => {
          pairsMap = getSquarePairs(squares);
          pairsList = Object.values(pairsMap);

          cy.get(pairsList[0][0]).click();
          cy.get(pairsList[1][0]).click();

          cy.get('.square').should('have.length', TOTAL_SQUARES);
        });
      });

      it('solves the game', () => {
        cy.get('.square').should('have.length', TOTAL_SQUARES);

        pairsList.forEach((pair) => {
          cy.get(pair[0]).click();
          cy.get(pair[1]).click();
        });

      });
    });
  });
});


function getSquarePairs(square) {
  const pairs = {};
  square.each((i, square) => {
    const colorClass = square.className.replace('square h-100 ', '');

    if (pairs[colorClass]) {
      pairs[colorClass].push(square);
    } else {
      pairs[colorClass] = [square];
    }
  });
  return pairs;
}
