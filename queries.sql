-- Creating table named book_notes
CREATE TABLE book_notes(
    id SERIAL PRIMARY KEY,
    title TEXT,
    author TEXT,
    description TEXT,
    image_url TEXT
);

-- for test purpose
INSERT INTO book_note (title, author, description, recommendation, image_url)
VALUES (
    'You Can Negotiate Anything',
    'Herb Cohen',
    '   Everything is negotiable. Challenge authority.
        You have the power in any situation. 
        This is how to realize it and use it. 
        A must-read classic from 1980 from a master negotiator. 
        My notes here aren’t enough because the little book is filled with so many memorable stories — 
        examples of great day-to-day moments of negotiation that will stick in your head for when you need them. 
        (I especially loved the one about the power of the prisoner in solitary confinement.) So go buy and read the book.
        I’m giving it a 10/10 rating even though the second half of the book loses steam, because the first half is so crucial.
    ',
    'Date read: 2023-08-02. How strongly I recommend it: 10/10',
	'assets/images/download - Copy.jpg'
);