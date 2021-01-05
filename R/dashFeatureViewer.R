# AUTO GENERATED FILE - DO NOT EDIT

dashFeatureViewer <- function(id=NULL, options=NULL, sequence=NULL, features=NULL, viewerStyle=NULL, zoom=NULL, selectedSeq=NULL, darkMode=NULL) {
    
    props <- list(id=id, options=options, sequence=sequence, features=features, viewerStyle=viewerStyle, zoom=zoom, selectedSeq=selectedSeq, darkMode=darkMode)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'DashFeatureViewer',
        namespace = 'dash_feature_viewer',
        propNames = c('id', 'options', 'sequence', 'features', 'viewerStyle', 'zoom', 'selectedSeq', 'darkMode'),
        package = 'dashFeatureViewer'
        )

    structure(component, class = c('dash_component', 'list'))
}
