<?php
function add_custom_sizes() {
	
	// Team Photos
	add_image_size( 'team-photo', 300, 300, true );

	// Event Cards
	add_image_size( 'event-thumb', 694, 388, true );
	
}
add_action('after_setup_theme','add_custom_sizes');