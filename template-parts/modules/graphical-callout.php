<?php 
	$unique_id = get_sub_field('unique_id');
	$background_image = get_sub_field('background_image');
	$copy = get_sub_field('copy');
	$link = get_sub_field('button_link');
?>
<section<?php if( !empty($unique_id) ):?> id="<?php echo slugify($unique_id);?>"<?php endif;?> class="module graphical-callout" style="background-image: url(<?php echo esc_url($background_image['url']);?>);">
	<div class="grid-container">
		<div class="grid-x grid-padding-x text-center">
			<div class="cell small-12 tablet-10 tablet-offset-1 xlarge-8 xlarge-offset-2 grid-x flex-dir-column align-middle align-center">
				<div class="text-wrap color-white"><?php echo $copy;?></div>
				<?php 
				if( $link ): 
					$link_url = $link['url'];
					$link_title = $link['title'];
					$link_target = $link['target'] ? $link['target'] : '_self';
					?>
				<div class="btn-wrap">
					<a class="button" href="<?php echo esc_url( $link_url ); ?>" target="<?php echo esc_attr( $link_target ); ?>">
						<span><?php echo esc_html( $link_title ); ?></span>
					</a>
				</div>
				<?php endif; ?>
			</div>
		</div>
	</div>
</section>