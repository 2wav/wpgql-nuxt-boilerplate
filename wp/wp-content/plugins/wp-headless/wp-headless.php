<?php
/***
Plugin Name:  WP Headless
Plugin URI:
Description:  A lightweight plugin to disable the WP frontend experience.
Version:      1.0.1
Author:       Joe Bailey-Roberts
Author URI:   http://joebr.io
License:      GPL3
License URI:  https://www.gnu.org/licenses/gpl-3.0.html
Text Domain:  wp-headless

@package wp-headless

WP Headless is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
any later version.

WP Headless is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with WP Headless. If not, see https://www.gnu.org/licenses/gpl-3.0.html.
 */

add_action( 'wp', 'wph_frontend_redirect' );

/**Check for function conflicts */
if ( ! function_exists( 'wph_frontend_redirect' ) ) {

	/**Function to check user status and redirect as appropriately */
	function wph_frontend_redirect() {

		if ( ! is_admin() ) {

			global $wp_query;

			$post_ID     = get_the_id();
			$homepage_id = get_option( 'page_on_front' );
			$blogpage_id = get_option( 'page_for_posts' );

			if ( $homepage_id === $post_ID || $blogpage_id === $post_ID || is_front_page() ) {

				wp_safe_redirect( get_admin_url() ); // If not an individual post, we redirect to the standard admin.
				exit;

			} else {

				$post_edit_link = admin_url( 'post.php?post=' . $post_ID . '&action=edit' );

				if ( is_user_logged_in() ) {
					wp_safe_redirect( $post_edit_link ); // Logged in users go to the post edit screen.
					exit;
				} else {
					wp_safe_redirect( wp_login_url( $post_edit_link ) ); // Not logged in users take a detour via the login page.
					exit;
				}
			}
		}

	}
}
