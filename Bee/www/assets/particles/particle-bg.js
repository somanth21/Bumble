(function() {

    var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

    // Main
    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: width/2, y: height/2};

        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create points
        points = [];
        for(var x = 0; x < width; x = x + width/20) {
            for(var y = 0; y < height; y = y + height/20) {
                var px = x + Math.random()*width/20;
                var py = y + Math.random()*height/20;
                var p = {x: px, originX: px, y: py, originY: py };
                points.push(p);
            }
        }

        // for each point find the 5 closest points
        for(var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for(var j = 0; j < points.length; j++) {
                var p2 = points[j]
                if(!(p1 == p2)) {
                    var placed = false;
                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        for(var i in points) {
            var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
            points[i].circle = c;
        }
    }

    // Event handling
    function addListeners() {
        if(!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
        var posx = posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY)    {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
    }

    // animation
    function initAnimation() {
        animate();
        for(var i in points) {
            shiftPoint(points[i]);
        }
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in points) {
                // detect points in range
                if(Math.abs(getDistance(target, points[i])) < 4000) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.6;
                } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.3;
                } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
            y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
            onComplete: function() {
                shiftPoint(p);
            }});
    }

    // Canvas manipulation
    function drawLines(p) {
        if(!p.active) return;
        for(var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
            ctx.stroke();
        }
    }

    function Circle(pos,rad,color) {
        var _this = this;

        // constructor
        (function() {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function() {
            if(!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
            ctx.fill();
        };
    }

    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
    
})();

// External Particle Background Module
(function() {
    'use strict';
    
    var ParticleBackground = {
        width: 0,
        height: 0,
        largeHeader: null,
        canvas: null,
        ctx: null,
        points: [],
        target: {x: 0, y: 0},
        animateHeader: true,
        
        // Initialize particle system
        init: function() {
            this.initHeader();
            this.initAnimation();
            this.addListeners();
        },
        
        initHeader: function() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.target = {x: this.width/2, y: this.height/2};

            this.largeHeader = document.getElementById('large-header');
            if (!this.largeHeader) return;
            
            this.largeHeader.style.height = this.height + 'px';

            this.canvas = document.getElementById('demo-canvas');
            if (!this.canvas) return;
            
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.ctx = this.canvas.getContext('2d');

            // Create points grid
            this.points = [];
            for(var x = 0; x < this.width; x = x + this.width/20) {
                for(var y = 0; y < this.height; y = y + this.height/20) {
                    var px = x + Math.random() * this.width/20;
                    var py = y + Math.random() * this.height/20;
                    var p = {x: px, originX: px, y: py, originY: py};
                    this.points.push(p);
                }
            }

            // Find closest points for each point
            for(var i = 0; i < this.points.length; i++) {
                var closest = [];
                var p1 = this.points[i];
                for(var j = 0; j < this.points.length; j++) {
                    var p2 = this.points[j];
                    if(!(p1 === p2)) {
                        var placed = false;
                        for(var k = 0; k < 5; k++) {
                            if(!placed) {
                                if(closest[k] === undefined) {
                                    closest[k] = p2;
                                    placed = true;
                                }
                            }
                        }

                        for(var k = 0; k < 5; k++) {
                            if(!placed) {
                                if(this.getDistance(p1, p2) < this.getDistance(p1, closest[k])) {
                                    closest[k] = p2;
                                    placed = true;
                                }
                            }
                        }
                    }
                }
                p1.closest = closest;
            }

            // Assign circles to points
            for(var i in this.points) {
                var c = new this.Circle(this.points[i], 2+Math.random()*2, 'rgba(0,170,255,0.3)');
                this.points[i].circle = c;
            }
        },

        addListeners: function() {
            var self = this;
            if(!('ontouchstart' in window)) {
                window.addEventListener('mousemove', function(e) {
                    self.mouseMove(e);
                });
            }
            window.addEventListener('scroll', function() {
                self.scrollCheck();
            });
            window.addEventListener('resize', function() {
                self.resize();
            });
        },

        mouseMove: function(e) {
            var posx = 0, posy = 0;
            if (e.pageX || e.pageY) {
                posx = e.pageX;
                posy = e.pageY;
            } else if (e.clientX || e.clientY) {
                posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            this.target.x = posx;
            this.target.y = posy;
        },

        scrollCheck: function() {
            this.animateHeader = document.body.scrollTop <= this.height;
        },

        resize: function() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            if (this.largeHeader) this.largeHeader.style.height = this.height + 'px';
            if (this.canvas) {
                this.canvas.width = this.width;
                this.canvas.height = this.height;
            }
        },

        initAnimation: function() {
            this.animate();
            for(var i in this.points) {
                this.shiftPoint(this.points[i]);
            }
        },

        animate: function() {
            var self = this;
            if(this.animateHeader && this.ctx) {
                this.ctx.clearRect(0, 0, this.width, this.height);
                for(var i in this.points) {
                    var distance = Math.abs(this.getDistance(this.target, this.points[i]));
                    
                    if(distance < 4000) {
                        this.points[i].active = 0.3;
                        this.points[i].circle.active = 0.6;
                    } else if(distance < 20000) {
                        this.points[i].active = 0.1;
                        this.points[i].circle.active = 0.3;
                    } else if(distance < 40000) {
                        this.points[i].active = 0.02;
                        this.points[i].circle.active = 0.1;
                    } else {
                        this.points[i].active = 0;
                        this.points[i].circle.active = 0;
                    }

                    this.drawLines(this.points[i]);
                    this.points[i].circle.draw();
                }
            }
            requestAnimationFrame(function() {
                self.animate();
            });
        },

        shiftPoint: function(p) {
            var self = this;
            // Simple animation without TweenLite dependency
            var animate = function() {
                p.x = p.originX + (Math.random() - 0.5) * 100;
                p.y = p.originY + (Math.random() - 0.5) * 100;
                setTimeout(function() {
                    self.shiftPoint(p);
                }, 1000 + Math.random() * 1000);
            };
            animate();
        },

        drawLines: function(p) {
            if(!p.active || !this.ctx) return;
            for(var i in p.closest) {
                this.ctx.beginPath();
                this.ctx.moveTo(p.x, p.y);
                this.ctx.lineTo(p.closest[i].x, p.closest[i].y);
                this.ctx.strokeStyle = 'rgba(0,170,255,' + p.active + ')';
                this.ctx.stroke();
            }
        },

        Circle: function(pos, rad, color) {
            var self = ParticleBackground;
            this.pos = pos || null;
            this.radius = rad || null;
            this.color = color || null;

            this.draw = function() {
                if(!this.active || !self.ctx) return;
                self.ctx.beginPath();
                self.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
                self.ctx.fillStyle = 'rgba(0,170,255,' + this.active + ')';
                self.ctx.fill();
            };
        },

        getDistance: function(p1, p2) {
            return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
        },
        
        // Public methods for external control
        enable: function() {
            this.animateHeader = true;
            document.getElementById('particle-background-container').style.display = 'block';
        },
        
        disable: function() {
            this.animateHeader = false;
            document.getElementById('particle-background-container').style.display = 'none';
        }
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            ParticleBackground.init();
        });
    } else {
        ParticleBackground.init();
    }

    // Expose to global scope for external control
    window.ParticleBackground = ParticleBackground;
})();
