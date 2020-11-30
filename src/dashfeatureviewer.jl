# AUTO GENERATED FILE - DO NOT EDIT

export dashfeatureviewer

"""
    dashfeatureviewer(;kwargs...)

A DashFeatureViewer component.
Feature Viewer for Protein or DNA sequences
From Calipho 
Add Features as object
Selected Feature or Sequence available in callback
Keyword arguments:
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `options` (Dict; optional): Options for Feature Viewer.
- `sequence` (String; optional): The Sequence or integer length value.
- `features` (Array; optional): The Features to View.
- `viewerStyle` (Dict; optional): The Style of Viewer.
- `zoom` (Array; optional): The Zoom of Viewer.
- `selectedSeq` (Array; optional): The selected sequence of Viewer.
"""
function dashfeatureviewer(; kwargs...)
        available_props = Symbol[:id, :options, :sequence, :features, :viewerStyle, :zoom, :selectedSeq]
        wild_props = Symbol[]
        return Component("dashfeatureviewer", "DashFeatureViewer", "dash_feature_viewer", available_props, wild_props; kwargs...)
end

