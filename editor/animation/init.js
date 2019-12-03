//Dont change it
//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $) {
        function fourToTheFloorCanvas(dom, data) {

            if (! data) {
                return
            }

            const input = data.in

            /*----------------------------------------------*
             *
             * attr
             *
             *----------------------------------------------*/
            const attr = {
                rect: {
                    background: {
                        'fill': 'black',
                    },
                },
                axis: {
                    'stroke-width': '0.7px',
                    'stroke': 'white',
                },
                circle: {
                    center: {
                        'stroke-width': '1px',
                        'stroke': 'white',
                        'fill': 'white',
                    },
                    surface: {
                        'stroke-width': 0,
                        'fill': '#545454',
                        'opacity': '0.7',
                    },
                },
                rectangle: {
                    'stroke-width': 1.5,
                    'stroke': 'white',
                },
                scale: {
                    figure: {
                        h: {
                            'fill': 'white',
                            'stroke': 'white',
                            'stroke-width': 0,
                        },
                        v: {
                            'fill': 'white',
                            'stroke': 'white',
                            'stroke-width': 0,
                            'text-anchor': 'end',
                        },
                    },
                    line: {
                        'stroke-width': '0.7px',
                        'stroke': 'white',
                    },
                },
            }

            /*----------------------------------------------*
             *
             * paper
             *
             *----------------------------------------------*/
            const [os_l, os_r, os_t, os_b] = [25, 15, 10, 15]
            const [os_w, os_h] = [os_l+os_r, os_t+os_b]
            const graph_length = 300
            const paper = Raphael(dom, graph_length+os_w, 
                                    graph_length+os_h, 0, 0);

            /*----------------------------------------------*
             *
             * calculate values
             *
             *----------------------------------------------*/
            const [rectangle, circles] = input
            const [w, h] = rectangle
            let [max_x, max_y, min_x, min_y] = [0, 0, 0, 0]

            for (let [cx, cy, r] of circles) {
                max_x = Math.max(cx+r, max_x)
                max_y = Math.max(cy+r, max_y)
                min_x = Math.min(cx-r, min_x)
                min_y = Math.min(cy-r, min_y)
            }

            const right = Math.max(max_x, w)
            const left = Math.min(min_x, 0)
            const top = Math.max(max_y, h)
            const bottom = Math.min(min_y, 0)
            const pos_max = Math.max(right, top)
            const neg_min = Math.min(0, left, bottom) * -1

            // scale
            let grain = 0

            if (pos_max >= 1000) {
                grain = 500
            } else if (pos_max >= 100) {
                grain = 50
            } else if (pos_max >= 10) {
                grain = 5
            } else {
                grain = 1
            }

            const scale_max = Math.ceil(pos_max / (grain*2)) * grain*2
            const scales = [scale_max / 2, scale_max]

            const margin = grain * 0.3
            const graph_neg_size
                = Math.ceil(neg_min / (grain)) * grain + margin
            const graph_pos_size
                = Math.ceil(pos_max / (grain)) * grain + margin

            // ratio
            const ratio = graph_length / (graph_neg_size + graph_pos_size)

            /*----------------------------------------------*
             *
             * background rect
             *
             *----------------------------------------------*/
            paper.rect(os_l, os_t, graph_length, graph_length).attr(
                attr.rect.background)

            /*----------------------------------------------*
             *
             * circles (surface)
             *
             *----------------------------------------------*/
            for (const [cx, cy, r] of circles) {
                paper.circle(
                    os_l+(graph_neg_size+cx)*ratio,
                    os_t+(graph_pos_size-cy)*ratio, r*ratio).attr(
                        attr.circle.surface)
            }

            /*----------------------------------------------*
             *
             * axis
             *
             *----------------------------------------------*/
            paper.path(['M', os_l, os_t+graph_pos_size*ratio,
                        'h', graph_length]).attr(attr.axis)
            paper.path(['M', os_l+graph_neg_size*ratio, os_t,
                        'v', graph_length]).attr(attr.axis)

            /*----------------------------------------------*
             *
             * rectangle
             *
             *----------------------------------------------*/
            paper.rect(
                os_l+(graph_neg_size*ratio),
                os_t+(graph_pos_size-h)*ratio, w*ratio, h*ratio).attr(
                    attr.rectangle)

            /*----------------------------------------------*
             *
             * circles (center)
             *
             *----------------------------------------------*/
            for (const [cx, cy, r] of circles) {
                paper.circle(
                    os_l+(graph_neg_size+cx)*ratio,
                    os_t+(graph_pos_size-cy)*ratio, 1).attr(
                        attr.circle.center)
            }

            /*----------------------------------------------*
             *
             * scale figures
             *
             *----------------------------------------------*/
            // 0
            paper.text(os_l+(graph_neg_size)*ratio-5,
                        os_t+graph_pos_size*ratio+10, 0).attr(
                            attr.scale.figure.v)

            for (const s of scales) {
                // horizontal
                paper.text(os_l+(graph_neg_size+s)*ratio,
                            os_t+graph_pos_size*ratio+10, s).attr(
                                attr.scale.figure.h)
                paper.path(['M', os_l+(graph_neg_size+s)*ratio,
                            os_t+graph_pos_size*ratio, 'v', 5]).attr(
                                attr.scale.line)

                // vertical
                paper.text(os_l+(graph_neg_size)*ratio-5,
                            os_t+(graph_pos_size-s)*ratio, s).attr(
                                attr.scale.figure.v)
                paper.path(['M', os_l+(graph_neg_size)*ratio,
                            os_t+(graph_pos_size-s)*ratio, 'h', -4]).attr(
                                attr.scale.line)
            }
        }

        var $tryit;

        var io = new extIO({
            multipleArguments: true,
            functions: {
                python: 'is_covered',
                js: 'isCovered'
            },
            animation: function($expl, data){
                fourToTheFloorCanvas(
                    $expl[0],
                    data
                )
            }
        });
        io.start();
    }
);
