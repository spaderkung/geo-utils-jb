
let arc_p, arc2_p, points, points2, points3

// Reserved name for P5 library. This function will be called once.
function setup() {
  // frameRate(50)
  createCanvas(windowWidth, 0.99 * windowHeight * 0.99)
  // createCanvas(1920, 1080)
  angleMode(DEGREES)

  // Generate 12 points along an arc that is a quarter of a circle with radius 1
  arc_p = GeoPointsJB.generate_arc_points(8, 0.25, 1, 0)
  GeoPointsJB.scale_points(arc_p, width * 0.25)

  // Create another arc using JSON for shallow copy
  // This one gets extra control pooints and is drawn as a Catmull-Rom spline
  arc2_p = JSON.parse(JSON.stringify(arc_p))
  GeoPointsJB.rotate_points(arc2_p, 0.5)
  GeoPointsJB.translate_points(arc2_p, { x: width, y: height })
  GeoPointsJB.add_control_points_to_points(arc2_p)

  // Create evenly spaced polygon points in a square for the purpose of a catmull-rom spline
  // creating a rounded square.
  // (1, 0), (0, 1), (-1, 0), (0, -1)
  points = GeoPointsJB.generate_polygon_points(4, 1)
  points = GeoPointsJB.SQUARE_POINTS
  GeoPointsJB.close_catmull_rom_spline(points)
  GeoPointsJB.translate_points(points, { x: width / 2, y: height / 2 })
  GeoPointsJB.scale_points(points, width * 0.25, { x: width / 2, y: height / 2 })

  star_p = GeoPointsJB.STAR_5_POINTS
}

// Reserved name for P5 library. This function will be called repeatedly.
function draw() {
  background("#131415")

  strokeWeight(4)
  fill("#131415")

  // UL
  stroke("#FFC107")
  draw_points(arc_p)

  // Center
  stroke(palette_vs_code_dark[10])
  draw_catmull_points(points)

  // LR
  stroke(palette_vs_code_dark[15])
  draw_catmull_points(arc2_p)
}

function draw_catmull_points(points, draw_nodes = true) {
  beginShape()
  for (let p of points) {
    curveVertex(p.x, p.y)
  }
  endShape()
  if (draw_nodes) {
    // Draw the nodes
    for (let p of points) {
      circle(p.x, p.y, 14)
    }
  }
}

  function draw_points(points, draw_nodes = true) {
  beginShape()
  for (let p of points) {
    vertex(p.x, p.y)
  }
  endShape()
  if (draw_nodes) {
    // Draw the nodes
    for (let p of points) {
      circle(p.x, p.y, 14)
    }
  }
}

