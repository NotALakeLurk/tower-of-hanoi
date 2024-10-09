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

const NUM_PEGS = 3;

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
    this.selected_peg = rem_euclid(this.selected_peg + delta, NUM_PEGS) // 3 pegs
  }
};

function get_disk_width(disk_size, num_disks) {
    return 100 - (100/num_disks)*disk_size; // size of disks decreases linearly
                                            // from 100%
}

function update_graphics(game_state, puzzle_area, disk_elems) {
  for (let i = 0; i < NUM_PEGS; ++i) {
    puzzle_area.
}

document.body.onload = main;

function main() {
  const num_disks = 5;

  // logical setup
  for (let i = 0; i < num_disks; ++i) {
    game_state.pegs[0].push(i); // push the disks onto the first peg
  }

  // graphical setup

  let puzzle_area = document.getElementById("puzzle-area");

  for (const peg in game_state.pegs) {
    let peg_elem = document.createElement("div");
    peg_elem.class = "peg";

    puzzle_area.appendChild(peg_elem);
  }

  
}

