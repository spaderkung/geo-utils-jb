 * @property {function} scale_points - Scale an array of points in place.
 * @property {function} offset_points - Offset an array of points in place.
 * @property {function} reflect_points_point - Reflects the points inline around a single point.
 * @property {function} reflect_points_line - Refelcts points inline around a line.
 * @property {function} reflect_point - Reflect a single point in place around another point.
 * @property {function} rotate_points - Rotate an array of points in place.
 * @property {function} normalize_points - Normalize the points so that the smallest dimension goes from 0..1 and that both dimensions are offset so their smallest point is at 0.
 * @property {function} get_center - Returns the geometric center of the points.
 * @property {function} center_points - Center points around a provided center point.
 * @property {function} get_midpoint - Returns the midpoint 0.5*(max - min).
 * @property {function} close_catmull_rom_spline - Creates extra nodes at start and end as control points for a Catmull-Rom curve.
 * @property {function} signed_distance_circle - Returns the signed distance function for a circle in 2D space.
 * @property {function} signed_distance_rect - Returns the signed distance function for a rectangle in 2D space.
 * @property {function} signed_distance_line - Returns the signed distance function for a line segment in 2D space.
 * @property {function} signed_distance_polygon - Returns the signed distance function for a polygon with provided points.
 * @property {function} signed_distance_vector - Returns the signed distance function for a vector in 2D space.
 * @property {function} generate_archimedean_spiral_points - Generates a set of points forming an Archimedean spiral.
 * @property {function} generate_polygon_points - Returns x, y pairs of polygon points.
 * @property {function} generate_arc_points - Returns x, y pairs of points along an arc in a clockwise direction.
 * @property {function} generate_square_with_extra_corner_points - Generates a square with extra points flanking each corner for more local normal.
 * @property {Array<{x: number, y: number}>} SQUARE_POINTS - Points for a square.
 * @property {Array<{x: number, y: number}>} SQUARE_WITH_EXTRA_90_PCT_CORNER_POINTS - Points for a square with extra points flanking each corner.
 * @property {Array<{x: number, y: number}>} REGULAR_EDER_5_POINTS - Points for a regular pentagon.
 * @property {Array<{x: number, y: number}>} REGULAR_EDER_6_POINTS - Points for a regular hexagon.
 * @property {Array<{x: number, y: number}>} REGULAR_EDER_8_POINTS - Points for a regular octagon.
 * @property {Array<{x: number, y: number}>} FOUR_STAR_POINTS - Points for a four-pointed star.
 * @property {Array<{x: number, y: number}>} STAR_5_POINTS - Points for a five-pointed star.
 * @property {Array<{x: number, y: number}>} T_POINTS - Points for a T shape.
