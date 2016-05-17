/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {

    //First Test suite

    describe('RSS Feeds', function () {

        //First test to verify variables have been defined and not empty

        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //This test loops through each feed in the allFeeds object
        //and ensures a URL is defined, and not empty.

        describe('allFeedURLs', function () {
            it('are defined', function () {
                function testURL(feed) {
                    expect(feed.url).toBeDefined();
                    expect(feed.url).not.toEqual("");
                }

                allFeeds.forEach(testURL);
            });
        });

        //This loops through each feed in the allFeeds object and there is a name defined, and not empty

        describe('All feed names', function () {
            it('are defined', function () {
                function testFeed(feed) {
                    expect(feed.name).toBeDefined();
                    expect(feed.name).not.toEqual("");
                }

                allFeeds.forEach(testFeed);
            });
        });

    });

    //2nd test suite for 'The Menu'

    describe('The Menu', function () {

        //Tests to see if menu is hidden by default

        it('hidden by default', function () {
            expect($('body').hasClass("menu-hidden")).toBe(true);
        });

        //section of the test to see if menu visibility changes when clicked (toggle)

        it('Visibility changes on click', function () {
            $(".menu-icon-link").click();
            expect($('body').hasClass("menu-hidden")).toBe(false);

            $(".menu-icon-link").click();
            expect($('body').hasClass("menu-hidden")).toBe(true);
        });
    });

    //3rd test suite

    describe('Initial Entries', function () {

        beforeEach(function (done) {
            loadFeed(0, done);
        });

        // Test to ensure loadFeed is called and it is not empty.

        it('loaded on page', function () {
            expect($('.feed').is(':empty')).toBe(false);
        });
    });

    //4th Test suite 'New Feed Selection'

    describe('New Feed Selection', function (done) {

        var oldFeedHTML;

        beforeEach(function (done) {
            loadFeed(1, function () {
                oldFeedHTML = $('.feed').html();
                done();
            });
        });

        //Test that when new feed is loaded, content changes. (Asynchronous)

        it('updates change', function (done) {
            loadFeed(2, function () {
                expect($('.feed').html()).not.toEqual(oldFeedHTML);
                done();
            });
        });
    });
});
