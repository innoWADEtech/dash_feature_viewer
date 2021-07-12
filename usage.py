import dash_feature_viewer
import dash
from dash.dependencies import Input, Output, State
import dash_html_components as html
import dash_core_components as dcc

app = dash.Dash(__name__)

features = [ 
    {
    'data': [{'x': 1, 'y': 4}, {'x': 6, 'y': 13}, {'x': 20, 'y': 30}],
    'name': "test feature 100000000",
    'className': "test1",
    'color': "#0F8292",
    'type': "rect",
    }, {
    'data': [{'id': 'dude','x': 5, 'y': 10, 'description': 'dude'}, {'id':'man','x': 6, 'y': 13, 'description': 'man'}, {'id':'no','x': 11, 'y': 40}],
    'name': "test feature 2",
    'className': "test2",
    'color': "#0F8222",
    'type': "rect",
    }
]

seq = "MASASDFASLAKSMDLKMQWEWRAITIWERTWEIQIWERIQWEIRIWERTWETWERITQIIQWERMASASDFASLAKSMDLKMQWEWRAITIWERTWEIQIWERIQWEIRIWERTWETWERITQIIQWERMASASDFASLAKSMDLKMQWEWRAITIWERTWEIQIWERIQWEIRIWERTWETWERITQIIQWER"

app.layout = html.Div([
    dcc.Dropdown(
        id='sequence',
        options = [
            {'label': 'Seq1','value':"MASASDFASLAKSMDLKMQWEWRAITIWERTWEIQIWERIQWEIRIWERTWETWERITQIIQWER"},
            {'label': 'Seq2','value':'DASDASDASDAS'},
            {'label': 'Seq3', 'value': seq}
        ],
    ),
    dcc.Dropdown(
        id='feature',
        options = [
            {'label':'Fet1','value': 0},
            {'label':'Fet2','value': 1},
        ],
        multi=True,
    ),
    dcc.Dropdown(
        id='zoom',
        options = [
            {'label':'Z1','value': 'a'},
            {'label':'Z2','value': 'b'},
        ],
    ),
    dash_feature_viewer.DashFeatureViewer(
        id='input',
        sequence="ALKLAKSLASMSLAKMSLAKSMALKMALDALSMALKSMALKSM",
        features=[],
        viewerStyle={},
        options={},
        zoom=[],
    ),
    html.Div(id='output'),
])


@app.callback(Output('input', 'sequence'), [Input('sequence', 'value')])
def display_output(value):
    if value:
        return value
    else:
        return dash.no_update

@app.callback(Output('input', 'features'), [Input('feature', 'value')])
def feat(value):
    if value:
        feets = [features[v] for v in value]
        return feets
    else:
        return dash.no_update

@app.callback(Output('input', 'zoom'), [Input('zoom', 'value')])
def dfat(zz):
    if zz:
        if zz == 'a':
            return [2,60]
        else:
            return [25,90]
    else:
        return dash.no_update

@app.callback(Output('output', 'children'), Input('input', 'selectedSeq'), State('input', 'sequence'))
def sel(select, seq):
    if select:
        seqsel = seq[select[0]:select[1]]
        return f"{seqsel} {select}"
    else:
        return dash.no_update

if __name__ == '__main__':
    app.run_server(debug=True)
