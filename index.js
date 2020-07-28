const generate = document.getElementById("generate"),
      mode = document.getElementById("mode"),
      basenote = document.getElementById("baseNote"),
      octave = document.getElementById("octave"),
      scaleContainer = document.getElementById("scale"),
      modes = {
        ionian: [2,2,1,2,2,2,1],
        dorian: [2,1,2,2,2,1,2],
        phrygian: [1,2,2,2,1,2,2],
        lydian: [2,2,2,1,2,2,1],
        mixolydian: [2,2,1,2,2,1,2],
        aeolian: [2,1,2,2,1,2,2],
        locrian: [1,2,2,1,2,2,2]
      };

const generateScale = () => {
    const codeSelected = modes[mode.value];
    const modeSelected = mode.value;
    const note = new Note(basenote.value, octave.value);
    const scale = new Scale(modeSelected, codeSelected, note)
    scaleContainer.innerHTML = "";
    for(let note of scale){
        let noteDiv = document.createElement("div"); 
        let noteName = document.createTextNode(note); 
        noteDiv.appendChild(noteName);
        scaleContainer.appendChild(noteDiv);
    }
}

generate.addEventListener("click", generateScale)
class Note {
    constructor(name, number) {
        this.name = name.toUpperCase();
        this.number = number;
    }

    get fullName() {
        return (this.name + this.number.toString())
    }

    static frequencies() {
        return new Map([
            ['C', 16.35],
            ['C#', 17.32],
            ['D', 18.35],
            ['D#', 19.45],
            ['E', 20.60],
            ['F', 21.83],
            ['F#', 23.12],
            ['G', 24.50],
            ['G#', 25.96],
            ['A', 27.50],
            ['A#', 29.14],
            ['B', 30.87]
        ])
    }

    getFrequency() { 
        const baseNote = Note.frequencies().get(this.name);
        return (baseNote * Math.pow(2, this.number))
    }
};

class Scale {
    constructor(name, code, baseNote) {
        this.name = name;
        this.code = code;
        this.baseNote = baseNote;
    }

    isRelativeTo(scale) {
        let isRelative = true;
        let notes = [];
        this.getNotes().forEach((note)=>{return notes.push(note.name)})
        for(let note of scale){
            if(notes.indexOf(note) === -1){
                isRelative = false
            }
        }
        return isRelative
    }

    static notes() {
        return ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
    }

    getNotes() {
        let index = Scale.notes().indexOf(this.baseNote.name);
        let note = new Note(Scale.notes()[index], this.baseNote.number);
        let octaveChange = false;
        let notes = [note];
        this.code.forEach((code, idx) => {
            let prevIndex = index;
            index = (index + code) % Scale.notes().length;
            if(prevIndex > index && octaveChange != true){
                octaveChange = true
            }
            if(idx < 6){
                notes.push(new Note(Scale.notes()[index], octaveChange ? this.baseNote.number + 1 : this.baseNote.number))
            }
        })
        return notes
    }

    [Symbol.iterator]() {
        let counter = 0;
        return  {
            next: () => {
                if (counter <= this.getNotes().length - 1) {
                    let result = { value: this.getNotes()[counter].name,  done: false }
                    counter++;
                    return result;
                }
                return { done: true };
            }
        }
    }
};

// const middleC = new Note('C', 4);
// const middleD = new Note('D', 4);
// const middleA = new Note('A', 4);
// const cMajorScale = new Scale('Major', [2,2,1,2,2,2,1], middleC)
// const dMajorScale = new Scale('Major', [2,2,1,2,2,2,1], middleD)
// const aMinorScale = new Scale('Minor', [2,1,2,2,1,2,2], middleA)

// for(let note of cMajorScale){
//     console.log('iterator', note)
// }

// console.log('getFreq C', middleC.getFrequency());
// console.log('getFreq A', middleA.getFrequency());
// console.log('name C', middleC.name);
// console.log('fullname C', middleC.fullName);
// console.log('getNotes cMajor', cMajorScale.getNotes());
// console.log('getNotes aMinor', aMinorScale.getNotes());
// console.log('isRelative', cMajorScale.isRelativeTo(aMinorScale));