This website scrapes and displays news articles from Food and Wine Magazine.

1. Scraping needs to be done using the "/scrape" route.  First scrape is done on "https://www.foodandwine.com/news" while subsequent scrapes are done for each article url obtained from the first scrape.  This is how the site is able to display excerpts from the home screen.  Because there are multiple scrapes happening at once, I cannot integrate the scraping to happen first, then redirect to home page... will need more time to figure that part out.

2. Home page is displayed using the "/" route. Click on "Read Full Article" to read the full article in modal.  Comments can be submitted within the modal as well.

3. I did not create a login system... I will need more time in the future to make a login system (when that happens, perhaps I can integrate the scraping as well, since the login page will display before the home page, and scraping will definitely have completed by the time user logs in).  Instead of a login system, I implemented a password check:
    a. When submitting a comment, the user has to enter a username, a pin, and the comment.
    b. When deleting a comment, the user has to enter the same pin.  This serves to prevent other users from deleting your comments.

4. Each comment is labelled with a "UID" of sorts, this is to make $pulling comments easier to perform.  The UID is username + current datetime.  The idea is that the user will never be able to enter multiple comments at the same time, therefore ensuring the uniqueness of this "UID".  I did look online for examples of UID generating code snippets, but didn't see anything I liked enough.

5. Other ideas to implement in the future:
    a. Article titles can be links to the actual articles at foodandwine.com
    b. Instead of scraping for text, I can scrape html instead; this would more likely preserve links and videos embedded in the actual articles.