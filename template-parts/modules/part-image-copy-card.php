<?php 
	$unique_id = get_sub_field('unique_id');

	if(!is_page_template()) {
		$image_copy_card = get_sub_field('image_copy_card');
	} else {
		$image_copy_card = get_field('image_copy_card');
	}
	if( !empty($image_copy_card) ):
		$layout = $image_copy_card['layout'];
?>

<section<?php if( !empty($unique_id) ):?> id="<?php echo slugify($unique_id);?>"<?php endif;?> class="<?php if(!is_page_template()):?>module <?php endif;?>img-copy-card type-text-btn <?php echo $layout;?>">
	<div class="grid-container">
		<div class="inner grid-x grid-padding-x<?php if($layout == 'image-right'):?> tablet-flex-dir-row-reverse<?php endif;?>">

			<div class="left cell small-12 tablet-6 large-7 grid-x align-top">
				<?php 
					if( !empty($image_copy_card['image']) ):
					$image = $image_copy_card['image'];
				?>
				<div class="img-wrap">
					<img src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
				</div>
				<?php endif;?>
			</div>
			<div class="right black-bg cell small-12 tablet-6 large-5">
				<div class="text-btns-wrap">
					<?php if( !empty($image_copy_card['text']) ):?>
					<div class="text-wrap black-bg">
						<?php echo $image_copy_card['text'];?>
					</div>
					<?php endif;?>
					<?php 
					if( $buttons = $image_copy_card['buttons'] ):?>
					<div class="btns-wrap grid-x grid-padding-x">
						<?php foreach($buttons as $button):
							if( $button['button_link'] ):
								$btn_link = $button['button_link'];
								$link_url = $btn_link['url'];
								$link_title = $btn_link['title'];
								$link_target = $btn_link['target'] ? $btn_link['target'] : '_self';
								
								$add_chev = $button['add_right_chevron'];
	
						?>
						<div class="btn-wrap cell shrink">
							<a class="button<?php if($add_chev == 'true'):?> chev-link grid-x align-middle<?php endif;?>" href="<?php echo esc_url( $link_url ); ?>" target="<?php echo esc_attr( $link_target ); ?>">
								<span><?php echo esc_html( $link_title ); ?></span>
								<?php if($add_chev == 'true'):?>
									<svg xmlns="http://www.w3.org/2000/svg" width="9.254" height="15.679" viewBox="0 0 9.254 15.679">
							  		<path id="Path_773" data-name="Path 773" d="M267.723,1265.463l7.132,7.132-7.132,7.132" transform="translate(-267.016 -1264.756)" fill="none" stroke="#000" stroke-width="2"/>
									</svg>
								<?php endif;?>
							</a>
						</div>
					<?php endif;
						endforeach;?>
					</div>
					<?php endif;?>
				</div>
				<svg class="thin-stripes" xmlns="http://www.w3.org/2000/svg" width="192.309" height="72.179" viewBox="0 0 192.309 72.179">
				  <g id="Group_65" data-name="Group 65" transform="translate(-579.846 -1277.649)">
					<line id="Line_7" data-name="Line 7" x1="70.484" y2="71.477" transform="translate(580.202 1278)" fill="none" stroke="#efefef" stroke-width="1"/>
					<line id="Line_8" data-name="Line 8" x1="70.484" y2="71.477" transform="translate(600.056 1278)" fill="none" stroke="#efefef" stroke-width="1"/>
					<line id="Line_9" data-name="Line 9" x1="70.484" y2="71.477" transform="translate(620.904 1278)" fill="none" stroke="#efefef" stroke-width="1"/>
					<line id="Line_10" data-name="Line 10" x1="70.484" y2="71.477" transform="translate(640.758 1278)" fill="none" stroke="#efefef" stroke-width="1"/>
					<line id="Line_11" data-name="Line 11" x1="70.484" y2="71.477" transform="translate(660.613 1278)" fill="none" stroke="#efefef" stroke-width="1"/>
					<line id="Line_12" data-name="Line 12" x1="70.484" y2="71.477" transform="translate(680.467 1278)" fill="none" stroke="#efefef" stroke-width="1"/>
					<line id="Line_13" data-name="Line 13" x1="70.484" y2="71.477" transform="translate(701.315 1278)" fill="none" stroke="#efefef" stroke-width="1"/>
				  </g>
				</svg>
			</div>									
		</div>
	</div>
</section>
<?php endif;?>