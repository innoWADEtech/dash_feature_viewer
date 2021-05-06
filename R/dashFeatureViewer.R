# AUTO GENERATED FILE - DO NOT EDIT

dashFeatureViewer <- function(id=NULL, features=NULL, options=NULL, selectedSeq=NULL, sequence=NULL, viewerStyle=NULL, zoom=NULL) {
    
    props <- list(id=id, features=features, options=options, selectedSeq=selectedSeq, sequence=sequence, viewerStyle=viewerStyle, zoom=zoom)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'DashFeatureViewer',
        namespace = 'dash_feature_viewer',
        propNames = c('id', 'features', 'options', 'selectedSeq', 'sequence', 'viewerStyle', 'zoom'),
        package = 'dashFeatureViewer'
        )

    structure(component, class = c('dash_component', 'list'))
}
