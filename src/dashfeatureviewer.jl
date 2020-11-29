# AUTO GENERATED FILE - DO NOT EDIT

export dashfeatureviewer

"""
    dashfeatureviewer(;kwargs...)

A DashFeatureViewer component.
ExampleComponent is an example component.
It takes a property, `label`, and
displays it.
It renders an input with the property `value`
which is editable by the user.
Keyword arguments:
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `options` (Dict; optional): Options for Feature Viewer.
- `sequence` (String; optional): The Sequence or integer length value.
- `features` (Array; optional): The Features to View.
- `viewerStyle` (Dict; optional): The Style of Viewer.
- `featureSelected` (Dict; optional): The Style of Viewer.
- `zoom` (Array; optional): The Style of Viewer.
- `selectedSeq` (Array; optional): The Style of Viewer.
"""
function dashfeatureviewer(; kwargs...)
        available_props = Symbol[:id, :options, :sequence, :features, :viewerStyle, :featureSelected, :zoom, :selectedSeq]
        wild_props = Symbol[]
        return Component("dashfeatureviewer", "DashFeatureViewer", "dash_feature_viewer", available_props, wild_props; kwargs...)
end

