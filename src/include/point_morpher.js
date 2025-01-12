/** Morphes between different sets of points
 * It is required that the point sets are of the same length
 * Once the morph is complete it can automatically morph back again indefinitely.
 * @class
 * @property {Array<{x: number, y: number}>} points_current - The current set of points
 * @property {Array<{x: number, y: number}>} points_origin - The origin set of points
 * @property {Array<{x: number, y: number}>} points_target - The target set of points
 * @property {number} morph_durations - The duration of the morph in any unit. (Default is milliseconds)
 * @property {boolean} morph_started - Whether the morph has started
 * @property {boolean} morph_running - Whether the morph is currently running
 * @property {boolean} morph_complete - Whether the morph has completed
 * @property {number} morph_time_current - The current time of the morph
 * @property {number} morph_pct_current - The current percentage of the morph
 * @property {function} easing_fn - The easing function to use for the morph
 * @property {number} forward - The direction of the morph. True: forward, False: backward
 * @property {number} passes - The number of passes to make before stopping. 0 = bounce forever. (Default is 1)
 * @property {number} passes_current - The number of passes made
 * @property {boolean} reverse_on_complete - Reverse the morph direction on completion
 * @author Jon Bolmstedt
 */
class PointMorpherJB {
  #morph_start_time = 0

  constructor() {
    this.points_current = []
    this.points_origin = []
    this.points_target = []
    this.morph_duration = 1000
    this.morph_running = false
    this.morph_complete = false
    this.morph_time_current = 0
    this.morph_pct_current = 0
    this.easing_fn = lerp
    this.forward = true
    this.passes = 1
    this.passes_current = 0
    this.reverse_on_complete = true
  }

  /** Start or restart the morph
   * @param {number} [current_time] - Optional start time in any unit. (Default is millis())
   */
  start(current_time) {
    this.#morph_start_time = current_time === undefined ? millis() : current_time
    this.morph_running = true
    this.morph_complete = false
    this.points_current = this.points_origin.map((obj) => JSON.parse(JSON.stringify(obj)))
  }

  /** Update the morph
   * Once complete the points can be switched for a new morph.
   * Once complete then start must be called to restart the morph.
   * @param {number} [current_time] - Optional current time in any unit. (Default is millis())
   */
  update(current_time) {
    current_time = current_time === undefined ? millis() : current_time

    if (this.morph_complete === false || this.passes === 0) {
      this.morph_complete = false
      this.morph_running = true
      this.morph_time_current = current_time - this.#morph_start_time
      this.morph_pct_current = this.morph_time_current / this.morph_duration

      if (this.morph_pct_current >= 1) {
        this.morph_pct_current = 1
        this.passes_current += 1
        this.morph_complete = true
        if (this.passes > 0 && this.passes_current >= this.passes) {
          this.morph_running = false
        } else {
          this.#morph_start_time = current_time
          this.forward = !this.forward
        }
      } else {
        if (this.forward) {
          this.points_current = PointMorpherJB.morph_points(
            this.points_origin,
            this.points_target,
            this.morph_pct_current,
            this.easing_fn
          )
        } else if (this.forward === false) {
          this.points_current = PointMorpherJB.morph_points(
            this.points_target,
            this.points_origin,
            this.morph_pct_current,
            this.easing_fn
          )
        }
      }
    }
  }

  /** Morph the points
   * @param {Array<{x: number, y: number}>} points_origin - The current set of points
   * @param {Array<{x: number, y: number}>} points_target - The target set of points
   * @param {number} t - The ratio of the morph 0..1
   * @param {function} [fn] - Optional easing function that takes two numbers and a ratio
   * @returns {Array<{x: number, y: number}>} The morphed points
   *
   * @example
   * morph_points(
   *  [{x: 0, y: 0}, {x: 1, y: 1}],
   * [{x: 1, y: 0}, {x: 0, y: 1}],
   * 0.5
   * )
   * // Returns [{x: 0.5, y: 0}, {x: 0.5, y: 1}]
   * */
  static morph_points(points_origin, points_target, t, fn = lerp) {
    let points = []
    for (let i = 0; i < points_origin.length; i++) {
      let x = fn(points_origin[i].x, points_target[i].x, t)
      let y = fn(points_origin[i].y, points_target[i].y, t)
      points.push({ x: x, y: y })
    }
    return points
  }

  /** When setting new points, the points_target will first replace the points_current */
  // set_points(points) {
  //   this.points_origin = points
  //   this.points_target = points
  // }
}
