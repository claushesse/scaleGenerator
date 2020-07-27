# Scale Generator
 ## Create two classes that represents music scales and music notes.
 
 ### Class Note:
 
    a) The constuctor will take a name and number.
    Example:
       ```const middleC = new Note ('C', 4)```
    Note that the name can be these values C,C#,D,D#,E,F,F#,G,G#,A,A#,B
    and numbers can be from 0 to 10.
    
    b) Should have a static Map that indicates base frequencies (Note 0):
    { c: 16.352, c#: ...., d:.. }
    
    c) Should have the following methods:
        1 getFrequency(): Number
        2 get fullname: String (use getters)
        Example:
        middleC.getFrequecy() // 261.626
        middleC.name = "C"
        middleC.fullName = "C4"

 ### Class Scale:
 
   a) The constructor will take a name, code, and baseNote.
   Example:
      ```const CMajorScale = new Scale('Major', [2,2,1,2,2,2,1], middleC)```
      
   Note tha the name can be any string. The sum of codes must be 12
   and middleC is an instace of Note      
   
   b) A static property that contains all the notes (12) to calculate the rest of scale
   [C,C#,D,D#,E,F,F#,G,G#,A,A#,B]
   
   c) Should have the following methods:
        1- getNotes(): Note[] //
        3- isRelativeTo(Scale): Boolean
        Example:
        CMajorScale.getNotes() // [Note1, Note2, Note3, Note4, Note5, Note6, Note7]
        CMajorScale.isRelativeTo(AMinorScale) // true
   * d) @@Symbol.Iterator that allows you to iterate over notes
   Example:
       for (let {name} of CMajorScale) {
          console.log(name);
       }
       // C, D, E, F, G, A, B
      
### Resources:
  https://eloquentjavascript.net/06_object.html
  
  https://en.wikipedia.org/wiki/C_(musical_note)
  
  https://en.wikipedia.org/wiki/C_(musical_note)
