// <reference types="Cypress" />
const helpers = {
    load(additionalProps = { canUpload: true, permissions: { canUpload: true } }) {
        cy.visit('/Elements/ContentExplorer', {
            onBeforeLoad: contentWindow => {
                contentWindow.PROPS = additionalProps;
            },
        });
    },
    getRow: rowNum => cy.getByDataPreview('ContentExplorer').find(`.bce-item-row-${rowNum}`),
    checkRows(rowNum) {
        cy.getByDataPreview('ContentExplorer')
            .find('.ReactVirtualized__Table')
            .then(table => {
                const totalRows = table[0].getAttribute('aria-rowcount');

                for (let i = 0; i < totalRows; i += 1) {
                    if (i !== rowNum) {
                        this.getRow(i).should('not.have.class', 'bce-item-row-selected');
                    }
                }
                if (rowNum >= 0) {
                    this.getRow(rowNum).should('have.class', 'bce-item-row-selected');
                }
            });
    },
    selectRow(rowNum) {
        this.getRow(rowNum)
            .as('row')
            .click()
            .should('have.class', 'bce-item-row-selected');
        this.checkRows(rowNum);
        return cy.get('@row');
    },
    clickAddButton() {
        cy.getByDataPreview('ContentExplorer')
            .find('.be-btn-add')
            .click();
    },
    clickUploadButton() {
        cy.get('.dropdown-menu-element > ul > li')
            .contains('Upload')
            .click();
    },
    clickNewFolderButton() {
        cy.get('.dropdown-menu-element > ul > li')
            .contains('New Folder')
            .click();
    },
    clickNewFolderCancelButton() {
        cy.get('.be-modal-btns > button')
            .contains('Cancel')
            .click();
    },
    clickNewFolderCreateButton() {
        cy.get('.be-modal-btns > button')
            .contains('Create')
            .click();
    },
    clickCloseUploadModal() {
        cy.get('.bcu-footer-left > button')
            .contains('Close')
            .click();
    },
    clickShareButton(rowNum) {
        this.getRow(rowNum)
            .get('.bce-more-options')
            .contains('Share')
            .click();
    },
    clickCloseShareButton() {
        cy.get('.be-modal-btns > button')
            .contains('Close')
            .click();
    },
};

describe('ContentExplorer', () => {
    beforeEach(() => {
        cy.server();
        cy.route('GET', '**/folders/*', 'fixture:content-explorer/root-folder.json');
    });

    describe('Selection', () => {
        it('Should not have a selected row to start', () => {
            helpers.load();
            helpers.checkRows(-1);
        });

        it('Should be able to select a row', () => {
            helpers.load();
            helpers.selectRow(3);
        });

        it('Should change selected rows', () => {
            helpers.load();
            helpers.selectRow(3);
            helpers.selectRow(5);
        });

        it('Should open and close upload modal', () => {
            helpers.load();
            helpers.selectRow(2);
            helpers.clickAddButton();
            helpers.clickUploadButton();
            helpers.clickCloseUploadModal();
            helpers.checkRows(2);
            helpers.selectRow(3);
            helpers.selectRow(1);
        });

        it('Should click add button and then select new row', () => {
            helpers.load();
            helpers.selectRow(2);
            helpers.clickAddButton();
            helpers.checkRows(2);
            helpers.selectRow(3);
            helpers.selectRow(5);
        });

        it('Should cancel creating new folder', () => {
            helpers.load();
            helpers.selectRow(2);
            helpers.clickAddButton();
            helpers.clickNewFolderButton();
            helpers.clickNewFolderCancelButton();
            helpers.checkRows(2);
            helpers.selectRow(3);
        });

        it('Should open and close share text', () => {
            helpers.load();
            helpers.clickShareButton(2);
            helpers.clickCloseShareButton();
            helpers.selectRow(3);
            helpers.selectRow(5);
        });
    });
});
