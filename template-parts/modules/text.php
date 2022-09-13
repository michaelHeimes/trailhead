<?php 
	$unique_id = get_sub_field('unique_id');
	$text_module = get_sub_field('text_module');
	$heading = $text_module['heading'];
	$columns = $text_module['columns'];
	$cols = 0;
	foreach($columns as $column) {
		$cols++;
	}
?>
<section<?php if( !empty($unique_id) ):?> id="<?php echo slugify($unique_id);?>"<?php endif;?> class="module text">
	<div class="grid-container">
		<div class="grid-x grid-padding-x">
			<div class="cell small-12<?php if ($cols == 1):?> tablet-10 tablet-offset-1<?php endif;?>">
				<div class="grid-x grid-padding-x">
			
					<?php if( !empty($heading) ):?>
					<div class="cell small-12">
						<h2><?php echo $heading;?></h2>
					</div>
					<?php endif;?>
					
					<div class="cell small-12">
						<div class="grid-x grid-padding-x small-up-1<?php if ($cols >= 2):?> medium-up-2<?php endif; if ($cols >= 3):?> tablet-up-3<?php endif; if ($cols == 4):?> tablet-up-4<?php endif;?>">
							<?php 
								foreach($columns as $column):
								$single_col = $column['column'];
								$link = $single_col['button_link'];
							?>
							<div class="cell">
								<div class="text-wrap">
									<?php echo $single_col['copy'];?>
								</div>
								<?php 
								if( $link ): 
									$link_url = $link['url'];
									$link_title = $link['title'];
									$link_target = $link['target'] ? $link['target'] : '_self';
									?>
									<a class="button" href="<?php echo esc_url( $link_url ); ?>" target="<?php echo esc_attr( $link_target ); ?>"><?php echo esc_html( $link_title ); ?></a>
								<?php endif; ?>
				
							</div>
							<?php endforeach;?>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>