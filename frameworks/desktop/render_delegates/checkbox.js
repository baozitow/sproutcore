// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2009 Apple Inc. All rights reserved.
// License:   Licened under MIT license (see license.js)
// ==========================================================================

/**
  Renders and updates DOM representations of a checkbox (just the box,
  not the title).
  
  Note: most of the actual rendering is done in CSS. The DOM element provided
  to the checkboxRenderDelegate must have the theme class names and the
  class name 'checkbox' (the name of the render delegate).
  
  Parameters
  --------------------------
  Expects these properties on the data source:
  
  - isSelected
  - isActive
  - isEnabled
  - title
  
  Optional parameters include all parameters for the labelRenderDelegate.
  
*/
SC.BaseTheme.checkboxRenderDelegate = SC.RenderDelegate.create({
  name: 'checkbox',
  
  render: function(dataSource, context) {
    var theme = dataSource.get('theme'),
        ariaLabel, labelId;

    // the label id is used so we can set the aria labelledby attribute
    labelId = SC.guidFor(dataSource) + "-label";

    var isSelected = dataSource.get('isSelected') || NO;
    var isActive = dataSource.get('isActive');
    var isDisabled = !dataSource.get('isEnabled');

    context.attr('role', 'checkbox');
    context.attr('aria-checked', isSelected.toString());
    context.attr('aria-labelledby', labelId);

    context.setClass({
      'sel': isSelected,
      'active': isActive,
      'disabled': isDisabled
    });
    
    context.push('<span class = "button"></span>');
    
    context = context.begin('span').addClass('label').id(labelId);
    theme.labelRenderDelegate.render(dataSource, context);
    context = context.end();
  },
  
  update: function(dataSource, jquery) {
    var theme = dataSource.get('theme');

    var isSelected = dataSource.get('isSelected');
    var isActive = dataSource.get('isActive');
    var isDisabled = !dataSource.get('isEnabled');

    // address accessibility
    jquery.attr('aria-checked', isSelected.toString());

    // NOTE: the other properties were already set in render, and should not
    // need to be changed.

    theme.labelRenderDelegate.update(dataSource, jquery.find('span.label'));

    // add class names
    jquery.setClass({
      'sel': isSelected,
      'active': isActive,
      'disabled': isDisabled
    });
  }
});

