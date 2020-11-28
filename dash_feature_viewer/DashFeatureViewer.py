# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class DashFeatureViewer(Component):
    """A DashFeatureViewer component.
ExampleComponent is an example component.
It takes a property, `label`, and
displays it.
It renders an input with the property `value`
which is editable by the user.

Keyword arguments:
- id (string; optional): The ID used to identify this component in Dash callbacks.
- options (dict; default {
    showAxis: true,
    showSequence: true,
    brushActive: true, //zoom
    toolbar: true, //current zoom & mouse position
    bubbleHelp: true, 
    zoomMax: 50 
}): Options for Feature Viewer.
- sequence (string; optional): The Sequence or integer length value.
- features (list; optional): The Features to View.
- viewerStyle (dict; default {width: '500px'}): The Style of Viewer.
- featureSelected (dict; optional): The Style of Viewer.
- zoom (list; optional): The Style of Viewer."""
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, options=Component.UNDEFINED, sequence=Component.UNDEFINED, features=Component.UNDEFINED, viewerStyle=Component.UNDEFINED, featureSelected=Component.UNDEFINED, zoom=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'options', 'sequence', 'features', 'viewerStyle', 'featureSelected', 'zoom']
        self._type = 'DashFeatureViewer'
        self._namespace = 'dash_feature_viewer'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'options', 'sequence', 'features', 'viewerStyle', 'featureSelected', 'zoom']
        self.available_wildcard_properties =            []

        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(DashFeatureViewer, self).__init__(**args)
