function rem_euclid(a, b) { // https://stackoverflow.com/a/20638659
  if (b == 0) throw new Error("DivideByZero");
  if (b == -1) return 0; // This test needed to prevent UB of `INT_MIN % -1`.
  let m = a % b;
  if (m < 0) {
    // m += (b < 0) ? -b : b; // avoid this form: it is UB when b == INT_MIN
    m = (b < 0) ? m - b : m + b;
  }
  return m;
}

const game_state = {
  selected_peg : 0, // which peg is selected
  held_disk : null, // the disk that is held

  // the three pegs. perhaps implement this as a jagged array in the future
  // each peg follows a stack data-structure
  pegs : new Array(new Array(), new Array(), new Array()),

  grab_release : function() {
    const peg = this.pegs[this.selected_peg];

    // grab disk if none held
    if (this.held_disk == null) {
      // pop top disk off stack and hold it
      this.held_disk = peg.pop();
      return;
    }

    // disk is held
    
    if (peg[peg.length-1] < this.held_disk && peg[peg.length-1] != undefined) 
      return; // that doesn't work!

    // selected peg is available (top is undefined or less than held disk)
    // put the held disk on the peg
    peg.push(this.held_disk);
    this.held_disk = null;
  },

  // inc_peg changes the selected peg to the next or previous peg based on whether 1 (next) or -1 (prev.) is given
  inc_peg : function(delta) {
    this.selected_peg = rem_euclid(this.selected_peg + delta, 3) // 3 pegs
  }
};

let puzzle_area = document.getElementById("puzzle-area");

puzzle_area.innerHTML += "<p>test</p>";
