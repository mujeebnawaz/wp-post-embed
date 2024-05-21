/**
 * Functional Requirements for API. 
 */
describe('GET posts given post type', () => {

        // Common arrangement for all assertions. 
        let host  = 'http://localhost'; 
        let route = '/wp-json/wp-post-link-post-embed/v1/get';

        it('should return 400 bad request if no parameters are given.',
        async () => {
            /**
             * Arrange
             * - No parameters
             */
            let params = new URLSearchParams( {} );

            // Act
            let response = await fetch( host + route  );
            let json     = await response.json();
        
            // Assert
            expect( response.status ).toBe(400);
            expect( json.error ).toEqual("Bad Request");
            
        });

        it('should return an object with property error saying "No posts found!", if post does not exist.',
        async () => { 
            /**
             * Arrange
             * - No parameters
             */
            let params = '?type=none&page=1'
            // Act
            let response = await fetch( host + route + params );
            let json     = await response.json();
            // Assert
            expect( response.status ).toBe(404);
            expect( json.error ).toEqual("No posts found");
        });

        it('should not have more than 10 objects by default.', 
        async () => {
            let params = '?type=post&page=1'
            // Act
            let response = await fetch( host + route + params );
            let json     = await response.json();

            // Assert
            expect( response.status ).toBe(200);
            const numberOfObjects = Object.keys( json ).length;
            expect(numberOfObjects).toBeLessThanOrEqual(10);
        });
    
        it('should contain objects with title and permalink properties.',
        async () => {
            let params = '?type=post&page=1'
            // Act
            let response = await fetch( host + route + params );
            let json     = await response.json();
            // Assert
            expect( response.status ).toBe(200);
            Object.values(json).forEach( obj => {
              expect( obj ).toEqual(
                expect.objectContaining({
                  title: expect.any(String),
                  permalink: expect.any(String)
                })
              );
            });
        });

        it('should return relevant results given keywords.', 
        async () => {
            let params = '?type=post&page=1&keyword=new'
            // Act
            let response = await fetch( host + route + params );
            let json     = await response.json();

            // Assert
            expect( response.status ).toBe(200);
            expect( Array.isArray(json) ).toBe(true);

            // Assert that the first object in the array has a specific title
            expect( json[0].title ).toEqual('new post 2');
        });
});