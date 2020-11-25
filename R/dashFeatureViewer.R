# AUTO GENERATED FILE - DO NOT EDIT

dashFeatureViewer <- function(id=NULL, options=NULL, sequence=NULL, features=NULL, viewerStyle=NULL, featureSelected=NULL) {
    
    props <- list(id=id, options=options, sequence=sequence, features=features, viewerStyle=viewerStyle, featureSelected=featureSelected)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'DashFeatureViewer',
        namespace = 'dash_feature_viewer',
        propNames = c('id', 'options', 'sequence', 'features', 'viewerStyle', 'featureSelected'),
        package = 'dashFeatureViewer'
        )

    structure(component, class = c('dash_component', 'list'))
}
