<?php
/*
Plugin Name: Portfolio Custom Blocks
Description: This plugin provides custom blocks for creating a portfolio
*/

function portfolio_custom_block_script_register() {
    wp_enqueue_script(
        'portfolio-custom-block',
        plugin_dir_url(__FILE__).'custom-block.js',
        array('wp-blocks', 'wp-editor', 'wp-components', 'wp-i18n'),
        true
    );
    wp_enqueue_style(
        'portfolio-editor-styles',
        plugin_dir_url(__FILE__).'editor-styles.css',
        array(),
        '1.0'
    );
}
add_action('enqueue_block_editor_assets', 'portfolio_custom_block_script_register');

function portfolio_custom_styles() {
    wp_enqueue_style(
        'portfolio-frontend-styles',
        plugin_dir_url(__FILE__).'frontend-styles.css',
        array(),
        '1.0'
    );
}
add_action('wp_enqueue_scripts', 'portfolio_custom_styles');
?>