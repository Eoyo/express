/*
 MathStudio (c) 2014 Pomegranate Apps
 Created by Chris DeSalvo
 http://mathstud.io
*/
var Z = "ontouchstart"in window;
window.MathStudio = function(Vb, id) {
    function k(a) {
        for (var b = "", c = 0, d = a.length; c < d; c++)
            b += String.fromCharCode(32 + (126 - a.charCodeAt(c)));
        return b
    }
    function ob(a) {
        if ("string" == typeof Vb)
            b = Vb;
        else {
            var b;
            b = (a ? "../" : "") + p;
            b += ".js?";
            b += "56789012"
        }
        b = new Worker(b);
        b.onmessage = function(b) {
            pb(b.data, a)
        }
        ;
        b.onerror = function(a) {
            console.log(a);
            console.log(a.message)
        }
        ;
        Wb(b);
        return b
    }
    function D(a) {
        var b = $(a[H]);
        (b = b ? aa(b) : 0) && b.F ? b.J = a : na ? (b && (b.F = !0),
        na.postMessage(a)) : typeof window[p] == Qa && (b && (b.F = !0),
        window[p](a))
    }
    function Wb(a) {
        if (a) {
            var b = {};
            b[jd] = kd;
            b[Xb] = id;
            a.postMessage(b)
        }
    }
    function za(a, b) {
        var c;
        for (c = a.parentNode; c && c.className != C; )
            c = c.parentNode;
        if (c && (c = c.querySelector(A(V + "-" + oa))) && Ra(c)) {
            b = b.toLowerCase();
            c = c.children;
            for (var d = 0, e = c.length; d < e; d++) {
                var f = c[d];
                if (f.textContent.toLowerCase() == b)
                    return f.className == P
            }
        }
        return (c = a.parentNode.dataset[b]) ? +c : !0
    }
    function Sa(a, b) {
        if (za(a, ca)) {
            var c = Math.floor(b.pageX - a.parentNode.getBoundingClientRect().left);
            ga(a, void 0, void 0, c);
            return !0
        }
        return !1
    }
    function ga(a, b, c, d) {
        var e = void 0 === a.w ? Aa(a.parentNode, "tx") : a.w
          , f = void 0 === a.H ? Aa(a.parentNode, "ty") : a.H
          , n = void 0 === a.a ? Aa(a.parentNode, "tz") : a.a
          , m = void 0 === a.u ? 1 : a.u
          , l = +Q(a).id
          , g = {};
        g[p] = V;
        g[Yb] = e;
        g[Zb] = f;
        g[pa] = n * m;
        g[H] = l ? l : $b(a);
        g[da] = b ? b : 0;
        g[qa] = c ? c : 0;
        d && (g[ca] = d);
        g[V + ca] = za(a, ca);
        g[V + pa] = za(a, pa);
        D(g)
    }
    function A(a) {
        return I + "." + a
    }
    function R(a) {
        a && (a.style.display = "block")
    }
    function q(a) {
        a && (a.style.display = "none")
    }
    function Ra(a) {
        return "none" != window.getComputedStyle(a).display
    }
    function ld(a) {
        return a && (a.getContext(md) || a.getContext("experimental-webgl"))
    }
    function Ta(a) {
        return v + "[type=" + a + "]"
    }
    function Aa(a, b) {
        return void 0 !== a.dataset && a.dataset[b] ? +a.dataset[b] : 0
    }
    function ac(a) {
        for (var b = -Infinity, c = 0, d = a.length; c != d; ++c)
            a[c] > b && (b = a[c]);
        return b
    }
    function u() {
        return document.createElement(I)
    }
    function z(a) {
        return document.createElement(a)
    }
    function S(a, b) {
        var c = document.createElement(a);
        c.innerHTML = b;
        return c
    }
    function bc(a) {
        return (a = $(a)) ? a : u()
    }
    function Ua(a) {
        if (!a.dataset) {
            if (a.attributes)
                for (var b = 0, c = a.attributes.length; b < c; b++) {
                    var d = a.attributes[b];
                    /^data-/.test(d.name) && (a.dataset || (a.dataset = []),
                    a.dataset[d.name.substr(5, d.name.length - 5)] = a.getAttributeNS(null, d.name))
                }
            if (a.children)
                for (b = 0,
                c = a.children.length; b < c; b++)
                    Ua(a.children[b])
        }
    }
    function M(a, b) {
        if (typeof window[p] != Qa && $MathStudio)
            try {
                localStorage.setItem(a, b)
            } catch (c) {
                console.log(c)
            }
    }
    function nd(a) {
        var b = [], c;
        for (c in a) {
            var d = a[c];
            "" != d && void 0 !== d && b.push(c + "=" + encodeURIComponent(d))
        }
        return b.join("&")
    }
    function Va(a, b, c, d) {
        var e = new XMLHttpRequest;
        e.onreadystatechange = function() {
            if (4 == e.readyState)
                if (c && (200 == e.status || 0 == e.status))
                    c(e.responseText);
                else if (d) {
                    var a = "Status: " + e.status
                      , a = a + ("\n Error: " + e.statusText)
                      , a = a + ("\n Response: " + e.responseText);
                    d(a)
                }
        }
        ;
        e.open(a, b, !0);
        return e
    }
    function cc(a, b) {
        var c = Va("POST", a, b, void 0);
        c.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        return c
    }
    function od(a, b) {
        cc("include/shorten.php", b).send(nd(a))
    }
    function Wa(a, b, c) {
        Va("GET", a, b, c).send(null)
    }
    function Xa(a, b, c, d) {
        a = Va("GET", a, c, d);
        a.setRequestHeader("Authorization", "Bearer " + b);
        a.send(null)
    }
    function pd(a, b, c, d) {
        a = cc(a, d);
        a.setRequestHeader("Authorization", "Bearer " + c);
        a.send(b)
    }
    function dc() {
        var a = ""
          , b = $SaveFileTextField.textContent;
        b != Ya && (a += J + "=" + b + "&");
        for (var b = E(), c = [], d = 0, e = b.length; d < e; d++) {
            var f = T($(b[d])).value;
            f && c.push(v + ("[" + d + "]") + "=" + encodeURIComponent(window.btoa(encodeURIComponent(f))))
        }
        return c.length ? a + c.join("&") : ""
    }
    function qb(a, b) {
        void 0 !== b && (a.id = b,
        a.children[2].innerHTML = b)
    }
    function rb(a) {
        var b = u();
        b.className = F;
        var c = u();
        c.className = v;
        b.appendChild(c);
        var d = u();
        d.className = ha;
        c.appendChild(d);
        var e = document.createElement(ha);
        e.spellcheck = !1;
        d.appendChild(e);
        ec(e);
        d = u();
        d.className = Za;
        d.innerHTML = fc;
        c.appendChild(d);
        c = u();
        c.className = C + " " + ra;
        b.appendChild(c);
        c = z(I);
        c.className = F + "-" + U;
        b.appendChild(c);
        qb(b, a);
        return b
    }
    function sa() {
        var a = sb() + 1;
        $MathStudio.appendChild(rb(a));
        ia(a);
        Ba()
    }
    function ia(a) {
        T($(a)).focus()
    }
    function Ba() {
        var a = E();
        M(tb, JSON.stringify(a))
    }
    function gc(a) {
        window.setTimeout(function() {
            a == +$MathStudio.querySelector(A(F) + ":last-child").id ? sa() : ia(hc(a))
        }, 1)
    }
    function ic() {
        var a = ta();
        if (ta && (a = $(+Q(a).id))) {
            var b = sb() + 1
              , c = rb(b);
            $MathStudio.insertBefore(c, a);
            ia(b);
            Ba();
            Ca()
        }
    }
    function qd() {
        for (var a = E(), b = 0, c = a.length; b < c; b++)
            ua(a[b]);
        $MathStudio.innerHTML = ""
    }
    function rd() {
        for (var a = va(), b = 0, c = a.length; b < c; b++)
            qb(a[b], b + 1)
    }
    function jc() {
        var a = ta();
        if (ta && !(1 >= E().length) && (a = +Q(a).id,
        $(a))) {
            ua(a);
            var b;
            a: {
                b = E();
                for (var c = 1, d = b.length; c < d; c++)
                    if (b[c] == a) {
                        b = b[c - 1];
                        break a
                    }
                b = 0
            }
            c = hc(a);
            a = $(a);
            a.parentNode.removeChild(a);
            c ? ia(c) : b && ia(b);
            Ba();
            Ca()
        }
    }
    function va() {
        return [].slice.call(($MathStudio ? $MathStudio : document).querySelectorAll(A(F)))
    }
    function E() {
        return va().map(function(a) {
            return +a.id
        })
    }
    function hc(a) {
        for (var b = E(), c = 0, d = b.length - 1; c < d; c++)
            if (b[c] == a)
                return b[c + 1];
        return 0
    }
    function sb() {
        var a = E();
        return a.length ? ac(a) : 0
    }
    function Q(a) {
        for (a = a.parentNode; a && a.className != F && a.className != kc; )
            a = a.parentNode;
        return a
    }
    function T(a) {
        return a.children[0].children[0].children[0]
    }
    function aa(a) {
        return a.children[1]
    }
    function sd(a, b) {
        if (a.nodeName != b.nodeName)
            return !1;
        var c = b.attributes.length;
        if (c <= a.attributes.length) {
            for (var d = 0; d < c; d++)
                if (void 0 === a.attributes[b.attributes[d].name])
                    return !1;
            return !0
        }
        return !1
    }
    function lc(a, b) {
        var c = a.childNodes.length;
        if (c == b.childNodes.length) {
            if (c)
                if (1 == c && 3 == a.childNodes[0].nodeType && 3 == b.childNodes[0].nodeType)
                    a.removeChild(a.lastChild),
                    a.appendChild(b.lastChild);
                else
                    for (var d = 0; d < c; d++) {
                        var e = a.childNodes[d]
                          , f = b.childNodes[d];
                        if (1 == e.nodeType && 1 == f.nodeType) {
                            if (!lc(e, f))
                                return !1
                        } else
                            return !1
                    }
        } else if (sd(a, b)) {
            for (; a.hasChildNodes(); )
                a.removeChild(a.lastChild);
            for (; b.hasChildNodes(); )
                a.appendChild(b.removeChild(b.firstChild))
        } else
            return !1;
        if (void 0 !== a.attributes && void 0 !== b.attributes)
            for (c = b.attributes.length,
            d = 0; d < c; d++)
                e = b.attributes[d],
                f = a.attributes[e.name],
                void 0 === f ? a.setAttribute(e.name, e.value) : f.value != e.value && (f.value = e.value);
        return !0
    }
    function pb(a, b) {
        var c = a[H]
          , d = aa($(c));
        d.F = !1;
        d.J && (D(d.J),
        d.J = 0);
        d.m && ub(d);
        var e = a[C];
        if (" " != e) {
            var f = u();
            f.innerHTML = e;
            if (!0 === a[G] || 1 === a[G])
                $Fullscreen.className = $a,
                d.innerHTML = "",
                d.appendChild(u());
            if (1 === a[Da])
                if (d.children.length && f.children.length && lc(d.children[0], f.children[0]))
                    vb(d);
                else {
                    if (e = f.children[0])
                        vb(e),
                        d.removeChild(d.children[0]),
                        d.insertBefore(e, d.children[0])
                }
            else
                d.innerHTML = f.innerHTML,
                d.className = "" == d.innerHTML ? C + " " + ra : C,
                ab(d),
                M(C + c, encodeURIComponent(d.innerHTML)),
                b && b(a);
            d.children[0] && (d = d.children[0]) && void 0 !== d.dataset && (d = d.dataset.error) && (ua(c),
            d = "table tr:nth-child(" + +d + ") td:nth-child(2)",
            c = $(c).querySelector(d)) && (c.className = "error")
        }
    }
    function td(a) {
        for (var b = 0, c = a.length; b < c; b++) {
            var d = a[b];
            $(d);
            d = T($(d));
            Ea(d)
        }
    }
    function Ea(a) {
        var b = a.value;
        if ("" != b) {
            $Search && ud(a);
            var c = +Q(a).id;
            ua(c);
            var d = aa($(c));
            wb(d, function() {
                d.innerHTML = $Computing ? $Computing.innerHTML : ""
            });
            var e = {};
            e[p] = K;
            e[v] = b;
            e[H] = c;
            b = $MathStudio.clientWidth - 20;
            400 > b && (e[da] = b);
            D(e);
            Ba();
            M(v + c, encodeURIComponent(a.value));
            return c
        }
    }
    function $b(a) {
        for (var b = Fa.querySelectorAll(A(F)), c = 0, d = b.length; c < d; c++)
            if (a.compareDocumentPosition(b[c]) & Node.DOCUMENT_POSITION_CONTAINS)
                return c;
        return -1
    }
    function vd(a) {
        for (a = a.parentNode; a && a.className != oa; )
            a = a.parentNode;
        for (var b = "", c = 0, d = a.children.length; c < d; c++)
            var e = a.children[c]
              , f = e.querySelector(v)
              , b = b + (Da + "(" + e.dataset[bb] + "," + (f.type == wa ? f.checked ? 1 : 0 : f.g ? f.g : f.l ? f.l : "" != f.value ? f.value : 0) + ");");
        return b
    }
    function mc(a, b) {
        var c = {};
        c[p] = Da;
        c[v] = a;
        c[H] = b;
        D(c)
    }
    function Ga(a) {
        var b = vd(a)
          , c = +Q(a).id
          , d = $(c)
          , e = aa($(c));
        d && e ? (wb(e, function() {
            var b = a.parentNode.parentNode.querySelector(A(ja))
              , c = u();
            c.className = p;
            c.innerHTML = $Computing ? $Computing.innerHTML : "";
            c = c.children[0].children[0];
            b.querySelector("." + c.className) || (c.className += " " + p,
            b.appendChild(c))
        }),
        mc(b, c)) : mc(b, $b(a))
    }
    function wd() {
        if (!$(cb)) {
            var a = z("script");
            a.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC-GW2B5QvacnAb1UvUTwWiB3urqu_7ch0&sensor=false&callback=" + cb;
            a.type = "text/javascript";
            a.id = cb;
            document.body.appendChild(a);
            return !1
        }
        return !0
    }
    function nc(a) {
        var b = a.dataset.map.split(",").map(function(a) {
            return +a
        });
        a = new google.L.Map(a,{
            Ma: google.L.Ga.Ia,
            Na: !1
        });
        for (var c = new google.L.Fa, d = 0, e = b.length; d < e; d += 2) {
            var f = new google.L.Ea(b[d],b[d + 1]);
            new google.L.Ha({
                position: f,
                map: a
            });
            c.extend(f)
        }
        a.La(c)
    }
    function oc() {
        if ($Fullscreen && $Fullscreen.className == $a) {
            var a = $Fullscreen.querySelector(db + "." + V);
            a ? a.ya() : ga($Fullscreen.querySelector(pc + "." + V), document.body.clientWidth, window.innerHeight)
        }
    }
    function eb(a) {
        return void 0 === a.a ? (a = a.parentNode.dataset.tz,
        void 0 === a ? 1 : a) : a.a
    }
    function qc(a, b) {
        void 0 === a.j ? a.parentNode.parentNode.f || !Z && Sa(a, b) || ga(a) : requestAnimationFrame(a.j)
    }
    function xd(a) {
        if (a.scale) {
            var b = a.currentTarget;
            b.a *= b.u;
            b.u = 1;
            qc(b, a)
        }
    }
    function yd(a) {
        if (a.scale) {
            var b = a.currentTarget;
            b.a = eb(b);
            b.u = 1 / a.scale;
            qc(b, a)
        }
    }
    function zd(a) {
        var b = a.currentTarget;
        if (za(b, pa)) {
            a.preventDefault();
            b.a = eb(b);
            var c = a.wheelDelta / 1E3;
            void 0 === b.j ? (b.a *= 1 - c,
            b.parentNode.parentNode.f || !Z && Sa(b, a) || ga(b)) : (b.a -= c,
            requestAnimationFrame(b.j));
            b.parentNode.dataset.tz = b.a
        }
    }
    function rc(a) {
        a.preventDefault();
        if ($Fullscreen && !sc()) {
            for (var b = E(), c = 0, d = b.length; c < d; c++)
                ua(b[c]);
            delete $Fullscreen.ha;
            b = +$Fullscreen.children[0].id;
            a = +Q(a.currentTarget).id;
            var c = document.body.clientWidth
              , d = window.innerHeight
              , e = {};
            e[p] = G;
            e[ja] = a;
            e[da] = c;
            e[qa] = d;
            e[H] = b;
            e[Yb] = 0;
            e[Zb] = 0;
            e[pa] = 1;
            D(e)
        }
    }
    function xb(a) {
        var b = a.currentTarget;
        b.parentNode.parentNode.f || Sa(b, a)
    }
    function tc(a) {
        a.preventDefault();
        var b = a.pageY
          , c = a.currentTarget;
        c.K = a.pageX;
        c.N = b
    }
    function uc(a) {
        var b = a.currentTarget;
        if (Z && $Fullscreen.ha == ca)
            xb(a);
        else if (b.K) {
            var c = a.pageY - b.N;
            b.w = (a.pageX - b.K) * eb(b) + Aa(b.parentNode, "tx");
            b.H = c * eb(b) + Aa(b.parentNode, "ty");
            b.tagName.toLowerCase() == db && b.className == V ? requestAnimationFrame(b.j) : b.parentNode.parentNode.f || !Z && Sa(b, a) || ga(b)
        } else
            xb(a)
    }
    function fb(a) {
        a = a.currentTarget;
        a.K && a.N && (delete a.K,
        delete a.N,
        a.w && (a.parentNode.dataset.tx = a.w,
        a.parentNode.dataset.ty = a.H))
    }
    function Ad(a) {
        var b = a.currentTarget;
        za(b, ca) && ga(b);
        fb(a)
    }
    function ec(a) {
        a.onfocus = function(a) {
            ka = a.target;
            va().map(function(a) {
                return a.className = F
            });
            Q(ka).className = kc
        }
        ;
        a.onblur = function() {
            ka && (Q(ka).className = F)
        }
    }
    function ub(a) {
        a.m && (window.clearTimeout(a.m),
        a.m = 0);
        (a = a.querySelector(A(p))) && a && a.parentNode.removeChild(a)
    }
    function wb(a, b) {
        ub(a);
        a.m = window.setTimeout(void 0 === b ? function() {}
        : b, 100)
    }
    function Bd(a) {
        a = a.target;
        a.className = a.className == P ? "" : P
    }
    function Cd(a) {
        var b = a.currentTarget;
        a = {
            x: a.touches[0].pageX,
            y: a.touches[0].pageY
        };
        b.Ba = a;
        b.ja = a
    }
    function Dd(a) {
        a.currentTarget.ja = {
            x: a.touches[0].pageX,
            y: a.touches[0].pageY
        }
    }
    function Ed(a) {
        var b = a.currentTarget
          , c = b.Ba
          , b = b.ja;
        5 > Math.abs(c.x - b.x) && 5 > Math.abs(c.y - b.y) && rc(a)
    }
    function sc() {
        var a = +$Fullscreen.children[0].id;
        if ($Fullscreen.className == $a) {
            $Fullscreen.className = "";
            ua(a);
            for (var a = E(), b = 0, c = a.length; b < c; b++) {
                var d = aa($(a[b]));
                ab(d)
            }
            return !0
        }
        return !1
    }
    function vb(a) {
        if (a) {
            var b = document.querySelector("#" + G + "-" + F + " " + I + "." + C) == a
              , c = db + "." + V
              , d = a.querySelector(c);
            d && Fd(d);
            if (!a.v && !a.f) {
                if (d = a.querySelector(A(V + "-" + oa)))
                    if (Z)
                        q(d);
                    else
                        for (var e = d.children, d = 0, f = e.length; d < f; d++)
                            e[d].onclick = Bd;
                if (e = a.querySelector(A(V + "-touch-" + oa)))
                    if (Z) {
                        for (var n = e.querySelectorAll("." + vc + " > " + I), d = 0, f = n.length; d < f; d++)
                            n[d].onclick = function(a) {
                                a = a.currentTarget;
                                for (var b = a.parentNode, c = 0, d = b.children.length; c < d; c++)
                                    b.children[c].className = "";
                                a.className = P;
                                $Fullscreen.ha = a.textContent.toLowerCase()
                            }
                            ;
                        if (d = e.querySelector("#" + V + "-" + G + "-" + U))
                            d.onclick = function() {
                                sc()
                            }
                            ;
                        (d = a.querySelector("g." + ca + "-" + K)) && (d.style[Gd] = Hd + "(0px,36px)")
                    } else
                        e && e.parentNode.removeChild(e);
                c = a.querySelectorAll(pc + "." + V + "," + c);
                if (c.length)
                    for (d = 0,
                    f = c.length; d < f; d++) {
                        a = c[d];
                        e = a.parentNode;
                        a.onmousemove = uc;
                        a.onmouseleave = Ad;
                        if (n = "0" !== e.dataset.move)
                            a.onmousedown = tc,
                            a.onmouseup = fb;
                        Z ? b ? (a.ontouchend = fb,
                        a.ontouchcancel = fb,
                        a.ongesturechange = yd,
                        a.ongestureend = xd,
                        n ? (a.ontouchstart = tc,
                        a.ontouchmove = uc) : a.ontouchmove = xb) : (a.ontouchstart = Cd,
                        a.ontouchmove = Dd,
                        a.ontouchend = Ed) : (a.ondblclick = rc,
                        0 !== e.dataset[pa] && (a.onmousewheel = zd))
                    }
                else {
                    var m = a.querySelector(A(Id));
                    m && (wd() ? nc(m) : window[cb] = function() {
                        nc(m)
                    }
                    )
                }
            }
        }
    }
    function ua(a) {
        a = aa($(a));
        a.F = !1;
        a.J = 0;
        ub(a);
        wc(a)
    }
    function wc(a) {
        a.f && (window.cancelAnimationFrame(a.f),
        a.f = 0);
        a.v && (window.clearTimeout(a.v),
        a.v = 0);
        (a = a.querySelector(db)) && a.V && (window.clearTimeout(a.V),
        a.V = 0)
    }
    function Jd(a) {
        var b = a.querySelectorAll(Ta(gb));
        if (b.length)
            for (var c = 0, d = b.length; c < d; c++)
                b[c].oninput = function(a) {
                    a = a.target;
                    a.parentNode.parentNode.children[0].childNodes[0].textContent = a.name + "=" + String(Math.round(1E4 * a.value) / 1E4);
                    Ga(a)
                }
                ;
        b = a.querySelectorAll(Ta(wa));
        if (b.length)
            for (c = 0,
            d = b.length; c < d; c++)
                b[c].onchange = function(a) {
                    Ga(a.target)
                }
                ;
        b = a.querySelectorAll(Ta(K));
        if (b.length)
            for (c = 0,
            d = b.length; c < d; c++)
                b[c][hb] = function(a) {
                    Ga(a.target)
                }
                ;
        a = a.querySelectorAll(Ta(U));
        if (a.length)
            for (c = 0,
            d = a.length; c < d; c++)
                b = a[c],
                b.l = b.dataset[ja],
                b.oa = JSON.parse(b.dataset[yb]),
                b.onclick = function(a) {
                    a = a.target;
                    var b = a.l
                      , c = a.oa
                      , d = c.length
                      , l = d - 1;
                    a.l = c[0];
                    for (var g = 0; g < d; g++)
                        if (b == c[g]) {
                            a.l = g == l ? c[0] : c[g + 1];
                            break
                        }
                    a.parentNode.parentNode.children[2].innerHTML = a.l;
                    Ga(a)
                }
    }
    function ab(a) {
        wc(a);
        vb(a);
        var b = a.querySelector(A(oa));
        b && b.className == oa && Jd(b);
        var c = a.children[0];
        c && c.className == V && void 0 !== c.dataset[zb] && (a.aa = function() {
            a.m || ga(c.children[0]);
            a.f = window.requestAnimationFrame(a.aa)
        }
        ,
        a.f = window.requestAnimationFrame(a.aa));
        if (b = a.querySelector(A(zb))) {
            var d = b.querySelector(v);
            if (d && (b = d.dataset[yb])) {
                b = JSON.parse(b);
                d.g = +d.value;
                d.la = +b[0];
                d.ka = +b[1];
                d.na = +b[2];
                d.ma = +b[3];
                var b = d.ma
                  , e = 1E3 / 30;
                b && 0 < b && 60 >= b && (e = 1E3 / b);
                a.T = function() {
                    if (!a.m) {
                        d.g += d.na;
                        d.g > d.ka && (d.g = d.la);
                        var b = a.querySelector(A(zb) + ">" + A(ja));
                        if (b) {
                            var c = d.g, m;
                            void 0 === m && (m = !1);
                            var l = Math.pow(10, 5)
                              , c = String(Math.round(c * l) / l);
                            if (m)
                                if (m = c.split("."),
                                2 == m.length && 5 != m[1].length)
                                    for (m = 5 - m[1].length,
                                    l = 0; l < m; l++)
                                        c += "0";
                                else if (1 == m.length)
                                    for (c += ".",
                                    l = 0; 5 > l; l++)
                                        c += "0";
                            b.innerHTML = d.name + "=" + c
                        }
                        Ga(d)
                    }
                    a.v = window.setTimeout(a.T, e)
                }
                ;
                a.v = window.setTimeout(a.T, e)
            }
        }
    }
    function xc(a) {
        var b = new Float32Array(16);
        this.S = function(c) {
            c.za(a, b)
        }
        ;
        this.wa = function() {
            b.set([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
        }
        ;
        this.ea = function(a) {
            var d;
            d = .1 * Math.tan(45 * Math.PI / 360);
            a = d * a;
            var e = -a
              , f = -d
              , n = a - e
              , m = d - f;
            b.set([.2 / n, 0, 0, 0, 0, .2 / m, 0, 0, (a + e) / n, (d + f) / m, -1000.1 / 999.9, -1, 0, 0, -200 / 999.9, 0])
        }
        ;
        this.xa = function(a) {
            for (var d = 0; 4 > d; d++)
                b[12 + d] = 0 * b[d] + 0 * b[4 + d] + b[8 + d] * a + b[12 + d]
        }
        ;
        this.R = function(a, d, e, f) {
            var n = 1 / Math.sqrt(d * d + e * e + f * f);
            d *= n;
            e *= n;
            f *= n;
            var m = Math.sin(a)
              , l = Math.cos(a)
              , g = 1 - l;
            a = d * d * g + l;
            var n = e * d * g + f * m
              , k = f * d * g - e * m
              , h = d * e * g - f * m
              , r = e * e * g + l
              , y = f * e * g + d * m
              , t = d * f * g + e * m;
            d = e * f * g - d * m;
            f = f * f * g + l;
            e = b[0];
            var m = b[1]
              , l = b[2]
              , g = b[3]
              , x = b[4]
              , Ab = b[5]
              , v = b[6]
              , u = b[7]
              , Bb = b[8]
              , q = b[9]
              , p = b[10]
              , w = b[11];
            b[0] = e * a + x * n + Bb * k;
            b[1] = m * a + Ab * n + q * k;
            b[2] = l * a + v * n + p * k;
            b[3] = g * a + u * n + w * k;
            b[4] = e * h + x * r + Bb * y;
            b[5] = m * h + Ab * r + q * y;
            b[6] = l * h + v * r + p * y;
            b[7] = g * h + u * r + w * y;
            b[8] = e * t + x * d + Bb * f;
            b[9] = m * t + Ab * d + q * f;
            b[10] = l * t + v * d + p * f;
            b[11] = g * t + u * d + w * f
        }
    }
    function Kd(a, b, c) {
        function d(a, b) {
            var c = e.createShader(a);
            e.shaderSource(c, b);
            e.compileShader(c);
            return e.getShaderParameter(c, e.COMPILE_STATUS) ? c : (alert(e.getShaderInfoLog(c)),
            null)
        }
        this.za = function(a, b) {
            e.uniformMatrix4fv(e.getUniformLocation(f, a), !1, b)
        }
        ;
        this.C = function(a, b) {
            e.uniform1f(e.getUniformLocation(f, a), b)
        }
        ;
        this.D = function(a) {
            e.uniform1i(e.getUniformLocation(f, "DM"), a)
        }
        ;
        this.ga = function(a, b) {
            var c = e.getAttribLocation(f, a);
            e.enableVertexAttribArray(c);
            e.bindBuffer(e.ARRAY_BUFFER, b);
            e.vertexAttribPointer(c, 3, e.FLOAT, !1, 0, 0)
        }
        ;
        this.use = function() {
            e.useProgram(f);
            return this
        }
        ;
        var e = a;
        a = d(e.VERTEX_SHADER, b);
        c = d(e.FRAGMENT_SHADER, c);
        var f = e.createProgram();
        e.attachShader(f, a);
        e.attachShader(f, c);
        e.linkProgram(f);
        e.useProgram(f)
    }
    function yc(a, b, c, d) {
        b *= 3;
        c *= 3;
        var e = a[b]
          , f = a[b + 1];
        b = a[b + 2];
        var n = a[c]
          , m = a[c + 1];
        c = a[c + 2];
        if (e == n && f == m && b == c)
            return !1;
        d *= 3;
        var l = a[d]
          , g = a[d + 1];
        a = a[d + 2];
        return e == l && f == g && b == a || l == n && g == m && a == c ? !1 : !0
    }
    function Cb(a, b) {
        var c = a.createBuffer();
        a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, c);
        a.bufferData(a.ELEMENT_ARRAY_BUFFER, new Uint16Array(b), a.STATIC_DRAW);
        return c
    }
    function Fd(a) {
        var b = window.devicePixelRatio || 1;
        a[da] = parseInt(a.style[da], 10) * b;
        a[qa] = parseInt(a.style[qa], 10) * b;
        var b = a.parentNode
          , c = b.dataset.r;
        a.O = c ? JSON.parse(c) : [.785, .3925, 0];
        var d = b.sa;
        d || (d = ld(a),
        b.sa = d);
        if (d) {
            d.clearColor(0, 0, 0, 0);
            d.enable(d.DEPTH_TEST);
            d.depthFunc(d.LEQUAL);
            d.enable(d.POLYGON_OFFSET_FILL);
            d.polygonOffset(1, 0);
            var e = new xc("MV")
              , f = new xc("PP");
            d.Da = a[da];
            d.Ca = a[qa];
            f.ea(d.Da / d.Ca);
            var c = b.dataset[V + "s"]
              , n = Number.MAX_VALUE;
            c && (n = +c);
            for (var m = Number.MAX_VALUE, l = Number.MIN_VALUE, g = 1, k = []; !(g > n); ) {
                var h = g++
                  , c = b.dataset[V + h];
                if (!c)
                    break;
                var r = b.dataset["v" + h]
                  , y = b.dataset["f" + h]
                  , t = c.replace(kSurfaceTextReadPattern, function(a) {
                    var b = kSurfaceTextLookupTable[a];
                    return b ? b : a
                });
                try {
                    t = JSON.parse("[" + t + "]")
                } catch (v) {
                    t = t.split(",")
                }
                var x = +t.shift()
                  , u = +t.shift()
                  , q = +t.shift()
                  , c = {};
                c.Y = +t.shift();
                c.X = +t.shift();
                c.c = +t.shift();
                c.Ja = +t.shift();
                c.G = +t.shift();
                c.ba = +t.shift();
                c.A = +t.shift();
                9 < x && (c.qa = +t.shift(),
                c.pa = +t.shift());
                c.ua = r;
                c.ra = y;
                c.s = u * q;
                c.h = [];
                x = u * q * 3;
                if (t.length == x) {
                    var p = t.slice(0, x);
                    c.h = new Float32Array(p)
                } else {
                    for (var w = 0, C = 1 / u, Y = 1 / q, x = u * q * 3, p = new Float32Array(x), A = -.5, z = -.5, B = h = 0; B < q; B++) {
                        for (x = 0; x < u; x++)
                            p[h++] = A,
                            p[h++] = t[w++],
                            p[h++] = -z,
                            A += C;
                        A = -.5;
                        z += Y
                    }
                    c.h = p
                }
                m = Number.MAX_VALUE;
                l = Number.MIN_VALUE;
                c.Y < m && (m = c.Y);
                c.X > l && (l = c.X);
                x = k.length;
                if ((x = b.ca ? b.ca[x] : null) && x.ua == r && x.ra == y && x.s == c.s && x.c == c.c)
                    y = x.B,
                    r = x.h = c.h,
                    d.bindBuffer(d.ARRAY_BUFFER, y),
                    d.bufferSubData(d.ARRAY_BUFFER, 0, new Float32Array(r)),
                    c = x;
                else if (c.P = new Kd(d,r ? atob(r) : "",y ? atob(y) : ""),
                f.S(c.P),
                c.$ = 0,
                c.I = 0,
                c.da = 0,
                c.M = 0,
                c.B = 0,
                c.Z = 0,
                1 == c.c || 3 == c.c)
                    r = c.h,
                    y = d.createBuffer(),
                    d.bindBuffer(d.ARRAY_BUFFER, y),
                    d.bufferData(d.ARRAY_BUFFER, r, d.DYNAMIC_DRAW),
                    c.B = y;
                else if (2 == c.c) {
                    n = [];
                    y = 0;
                    r = c.h;
                    h = 0;
                    for (g = r.length - 1; h < g; h++)
                        x = r[h],
                        1E21 < r[h + 1].y ? start++ : 1E21 > x.y && (n.push(h),
                        n.push(h + 1),
                        y++);
                    c.I = y;
                    c.M = Cb(d, n);
                    y = d.createBuffer();
                    d.bindBuffer(d.ARRAY_BUFFER, y);
                    d.bufferData(d.ARRAY_BUFFER, r, d.DYNAMIC_DRAW);
                    c.B = y;
                    break
                } else {
                    for (var w = x = 0, B = u, A = u - 1, z = q - 1, r = c.h, H = 0, K = B, y = C = 0, Y = [], p = [], t = new Float32Array(r.length), P = A + (c.qa ? 1 : 0), R = z + (c.pa ? 1 : 0), u = 1 == u % 2 ? 2 : 1, q = 1 == q % 2 ? 2 : 1, w = 0; w < R; w++) {
                        for (x = 0; x < P; x++) {
                            var D = x + (w == z ? 0 : K)
                              , E = x + H
                              , I = x == A ? w == z ? 0 : K : D + 1
                              , J = x == A ? H : E + 1
                              , L = 3 * D
                              , F = 3 * E
                              , G = 3 * I
                              , M = 3 * J
                              , h = !isNaN(r[L + 1])
                              , T = !isNaN(r[G + 1])
                              , U = !isNaN(r[M + 1]);
                            if (!isNaN(r[F + 1]) && T) {
                                var T = 0
                                  , X = !1;
                                if (h && yc(r, D, E, I)) {
                                    X = !0;
                                    p.push(D);
                                    p.push(E);
                                    p.push(I);
                                    C++;
                                    T++;
                                    0 == x % u && (Y.push(E),
                                    Y.push(D),
                                    y++);
                                    0 == w % q && (Y.push(E),
                                    Y.push(J),
                                    y++);
                                    for (var N = r[L], Q = r[L + 1], S = r[L + 2], h = r[F] - N, O = r[F + 1] - Q, W = r[F + 2] - S, N = N - r[G], Q = Q - r[G + 1], S = S - r[G + 2], O = [Q * W - S * O, S * h - N * W, N * O - Q * h], h = 0; 3 > h; h++)
                                        W = O[h],
                                        t[L + h] += W,
                                        t[F + h] += W,
                                        t[G + h] += W,
                                        t[M + h] += W
                                }
                                if (U && yc(r, E, J, I) && (p.push(E),
                                p.push(J),
                                p.push(I),
                                C++,
                                T++,
                                x == P - 1 && (Y.push(I),
                                Y.push(J),
                                y++),
                                w == R - 1 && (Y.push(I),
                                Y.push(D),
                                y++),
                                !X))
                                    for (U = r[F],
                                    J = r[F + 1],
                                    D = r[F + 2],
                                    h = r[M] - U,
                                    O = r[M + 1] - J,
                                    W = r[M + 2] - D,
                                    N = U - r[G],
                                    Q = J - r[G + 1],
                                    S = D - r[G + 2],
                                    O = [Q * W - S, O, S * h - N * W, N * O - Q * h],
                                    h = 0; 3 > h; h++)
                                        W = O[h],
                                        t[L + h] += W,
                                        t[F + h] += W,
                                        t[G + h] += W,
                                        t[M + h] += W;
                                1 == T && (Y.push(E),
                                Y.push(I),
                                y++)
                            }
                        }
                        H += B;
                        K += B
                    }
                    h = 0;
                    for (A = t.length; h < A; h += 3)
                        x = t[h],
                        B = t[h + 1],
                        w = t[h + 2],
                        z = Math.sqrt(x * x + B * B + w * w),
                        0 == z ? t[h] = t[h + 1] = t[h + 2] = 0 : (t[h] = Math.abs(x / z),
                        t[h + 1] = Math.abs(B / z),
                        t[h + 2] = Math.abs(w / z));
                    c.$ = C;
                    c.I = y;
                    c.da = Cb(d, p);
                    c.M = Cb(d, Y);
                    y = d.createBuffer();
                    d.bindBuffer(d.ARRAY_BUFFER, y);
                    d.bufferData(d.ARRAY_BUFFER, r, d.DYNAMIC_DRAW);
                    c.B = y;
                    x = d.createBuffer();
                    d.bindBuffer(d.ARRAY_BUFFER, x);
                    d.bufferData(d.ARRAY_BUFFER, t, d.STATIC_DRAW);
                    c.Z = x
                }
                k.push(c)
            }
            b.ca = k;
            a.ya = function() {
                var b = document.body.clientWidth
                  , c = window.innerHeight;
                a.style.width = +b + "px";
                a.style.height = +c + "px";
                var e = window.devicePixelRatio || 1
                  , b = b * e
                  , c = c * e;
                a[da] = b;
                a[qa] = c;
                d.viewport(0, 0, b, c);
                f.ea(b / c);
                b = 0;
                for (c = k.length; b < c; b++)
                    f.S(k[b].P.use());
                a.j()
            }
            ;
            a.j = function() {
                var b = a.w
                  , c = a.H;
                b || (b = 0);
                c || (c = 0);
                d.clear(d.COLOR_BUFFER_BIT | d.DEPTH_BUFFER_BIT);
                e.wa();
                e.xa(-1.25 * (void 0 !== a.a ? a.a : 1) * (void 0 !== a.u ? a.u : 1));
                e.R(a.O[0] + .05 * c, 1, 0, 0);
                e.R(a.O[1] + .05 * b, 0, 1, 0);
                e.R(a.O[2], 0, 0, 1);
                b = 0;
                for (c = k.length; b < c; b++) {
                    var f = k[b]
                      , g = f.P.use();
                    e.S(g);
                    g.C("PM", m);
                    g.C("CH", l - m);
                    g.ga("VP", f.B);
                    if (0 == f.c)
                        g.ga("VN", f.Z),
                        f.ba && (g.D(0),
                        d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, f.da),
                        d.drawElements(d.TRIANGLES, 3 * f.$, d.UNSIGNED_SHORT, 0)),
                        f.G && (d.lineWidth(f.G),
                        g.D(f.ba ? 1 : 0),
                        d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, f.M),
                        d.drawElements(d.LINES, 2 * f.I, d.UNSIGNED_SHORT, 0)),
                        f.A && (g.C("PS", f.A),
                        d.drawArrays(d.POINTS, 0, f.s));
                    else if (1 == f.c) {
                        var h = f.G;
                        h || (h = 1);
                        g.D(2);
                        d.lineWidth(h);
                        d.drawArrays(d.LINE_STRIP, 0, f.s);
                        f.A && (g.C("PS", f.A),
                        d.drawArrays(d.POINTS, 0, f.s))
                    } else
                        2 == f.c ? ((h = f.G) || (h = 1),
                        g.D(2),
                        d.lineWidth(h),
                        d.drawElements(d.LINES, 2 * f.I, d.UNSIGNED_SHORT, 0)) : 3 == f.c && (g.D(2),
                        g.C("PS", f.A),
                        d.drawArrays(d.POINTS, 0, f.s))
                }
            }
            ;
            a.j()
        } else
            b.innerHTML = Ld,
            b.className = Md
    }
    function Nd(a, b, c) {
        if (!("webkitSpeechRecognition"in window))
            return null;
        var d = new webkitSpeechRecognition;
        d.continuous = !0;
        d.interimResults = !0;
        d.onstart = function() {
            e = "";
            a && a()
        }
        ;
        var e = "";
        d.onresult = function(a) {
            var d = !1
              , m = ""
              , l = a.results;
            for (a = a.resultIndex; a < l.length; a++) {
                var g = l[a]
                  , k = g[0].transcript;
                g.isFinal ? (d = !0,
                e += k) : (m += k,
                R(Db))
            }
            k = e + m;
            b && b(k);
            d && (e = "",
            c && c(k))
        }
        ;
        d.onend = function() {}
        ;
        this.ia = function() {
            d.start()
        }
        ;
        this.Aa = function() {
            d.stop()
        }
    }
    function zc(a) {
        var b = $(a[H]).children[0].children[1]
          , c = a[v];
        a[v] ? (b.className = K,
        b.innerHTML = c) : a[C] || (b.className = K + ra);
        a = [];
        for (var b = document.querySelectorAll(I + "." + v + ">" + I + "." + K), c = 0, d = b.length; c < d; c++) {
            var e = b[c];
            e.textContent && a.push(v + ("[" + c + "]") + "=" + encodeURIComponent(btoa(e.textContent)))
        }
        b = window.location.href.split("/");
        c = b[0];
        $MathStudioButton.href = (c == X + ":" ? "mathstudio://" : c + "//" + b[2] + "/") + "?" + a.join("&");
        R($MathStudioButton)
    }
    function Ac(a) {
        var b = "https://www.googleapis.com/auth/" + ["userinfo.email", "userinfo.profile", "drive.file", "drive.install", "drive.appdata"].join(" https://www.googleapis.com/auth/");
        void 0 == a && (a = !0);
        (0,
        gapi.auth.authorize)({
            client_id: "901365169262.apps.googleusercontent.com",
            scope: b,
            immediate: a
        }, function(a) {
            a = a ? a.access_token : 0;
            $MathStudio && Od(a)
        })
    }
    function ta() {
        if (!ka) {
            var a = E();
            ia(a[a.length - 1])
        }
        return ka
    }
    function Ha(a) {
        a = a.trim();
        a = a.toLowerCase();
        return 0 === a.indexOf("if") || 0 === a.indexOf("loop") || 0 === a.indexOf("for") || 0 === a.indexOf("while") ? 1 : 0 === a.indexOf("else if") || 0 === a.indexOf("else") ? 2 : 0 === a.indexOf("end") ? -1 : 0
    }
    function ib(a, b, c, d) {
        if (!(0 > b))
            for (d = "c" + d; b < c; b++)
                a[b].className = d
    }
    function Eb(a, b, c, d) {
        for (d = "c" + d; null != (match = a.exec(b)); )
            for (var e = match.index, f = a.lastIndex; e < f; e++)
                c[e].className = d
    }
    function Pd(a) {
        for (var b = document.createDocumentFragment(), c = !0, d = 0, e = a.length; d < e; d++) {
            var f = a[d];
            c && " " == f ? (f = S(Fb, f),
            f.className = "c8") : (c = !1,
            f = S(Fb, f));
            b.appendChild(f)
        }
        if (!Bc || !a.length)
            return b;
        for (var c = b.childNodes, n = -1, m = -1, l = -1, d = 0, e = a.length - 1; d < e; d++)
            if (f = a[d],
            0 <= l)
                '"' == f && (ib(c, l, d + 1, 6),
                l = -1);
            else if ('"' == f)
                l = d,
                0 < d && "@" == a[d - 1] && --l;
            else if ("/" == f)
                if (f = a[d + 1],
                "/" == f) {
                    m = d;
                    break
                } else
                    "*" == f && (n = d);
            else
                "*" == f && (f = a[d + 1],
                "/" == f && (ib(c, -1 == n ? 0 : n, d + 2, 4),
                n = -1,
                d++));
        if (0 == m)
            return "c4";
        if (0 <= m) {
            if ("" == a.substring(0, m).trim())
                return "c4";
            ib(c, m, a.length, 4)
        } else {
            if (0 <= n)
                return "c4";
            0 <= l && ib(c, l, a.length, 6)
        }
        Eb(/(?![0-9])[a-zA-Z_0-9]+(?=[(])/g, a, c, 1);
        Eb(/@[a-zA-Z]+/g, a, c, 2);
        Eb(/@( +)?\(.+\)/g, a, c, 1);
        for (e = /\b(cyan|navy|blue|lime|green|orange|gold|olive|red|pink|purple|magenta|indigo|gray|brown)\b/g; null != (match = e.exec(a)); )
            for (f = match[0],
            d = match.index,
            n = e.lastIndex; d < n; d++)
                c[d].style.color = f;
        for (e = /\b(return)\b/g; null != (match = e.exec(a)); )
            for (d = match.index,
            n = e.lastIndex; d < n; d++)
                c[d].style.color = "royalblue";
        for (e = /\b(yellow)\b/g; null != (match = e.exec(a)); )
            for (f = match[0],
            d = match.index,
            n = e.lastIndex; d < n; d++)
                "yellow" == f && (c[d].style.backgroundColor = "rgba(255,255,0,0.4)");
        return b
    }
    function Gb(a, b) {
        var c = Pd(b);
        "string" == typeof c ? (a.className = Za + " " + c,
        a.textContent = b) : (a.className = Za,
        a.appendChild(c))
    }
    function Cc(a, b, c) {
        a.className = K;
        for (var d = b.length, e = d - 1, f = 0, n = 0, m = "", l = 0; l < d; l++) {
            var g = b[l]
              , k = 0;
            -1 == Ha(g) && (k = "c3");
            if (c) {
                var h = Ha(g)
                  , r = 0;
                -1 == h || 2 == h ? n-- : (r = g.fa("<[") - g.fa("</>"),
                0 > r && n--);
                var g = g.replace(/^\s+/g, "")
                  , y = "";
                if (n)
                    for (var t = 0; t < n; t++)
                        y += " ";
                g = y + g;
                (1 == h || 2 == h || 0 < r) && n++;
                m += g;
                l != e && (m += "\n")
            }
            h = g.trim();
            -1 != h.indexOf("/*") ? -1 == h.indexOf("*/") && f++ : -1 != h.indexOf("*/") ? (f--,
            0 == f && (k = 0)) : f ? k = "c4" : 0 === h.search(RegExp("!?@[A-Za-z]([A-Za-z0-9]+)?\\(.+\\)", "g")) && 0 == l ? k = "c5" : 0 === h.indexOf(ca + "(") ? k = "c7" : 0 < Ha(h) && (k = "c3");
            h = a.appendChild(z("tr"));
            r = S("td", l + 1);
            h.appendChild(r);
            k && Bc ? (r.className = k,
            y = z("td"),
            y.className = k,
            y.textContent = g.length ? g : " ") : (y = z("td"),
            g.length ? (Gb(y, g),
            r.className = y.className) : y.innerHTML = " ");
            h.appendChild(y)
        }
        return m
    }
    function Qd(a) {
        var b = a.split(/\r\n|\r|\n/g);
        if (1 >= b.length)
            return b = u(),
            Gb(b, a),
            b;
        a = z("table");
        Cc(a, b, void 0);
        return a
    }
    function Ia(a, b) {
        var c = a.parentNode.parentNode
          , d = c.children[0]
          , c = c.children[1]
          , e = a.value
          , f = e.split(/\r\n|\r|\n/g);
        if (1 >= f.length)
            c.className = Za,
            d.className = ha,
            e ? (c.innerHTML = "",
            Gb(c, e)) : c.innerHTML = fc;
        else {
            var n = z("table")
              , f = Cc(n, f, b);
            b && f != e && (a.value = f);
            c.innerHTML = "";
            c.className = Dc;
            c.appendChild(n);
            d.className = Dc + "-" + ha
        }
    }
    function Hb(a, b) {
        var c = $(Ja);
        a ? (c.value = a,
        M(Ja, a)) : c && (c.value = "",
        M(Ja, ""));
        $SaveFileTextField && ($SaveFileButton && ($SaveFileButton.innerHTML = Ec),
        b ? ($SaveFileTextField.innerHTML = b,
        $SaveFileTextField.className = a ? "saved-file-box" : "new-file-box") : ($SaveFileTextField.className = Ya,
        $SaveFileTextField.className = "new-file-box"));
        M(J, b ? b : "")
    }
    function jb() {
        return "https://www.googleapis.com/drive/v2/files"
    }
    function Od(a) {
        if (a) {
            R($FileMenu);
            q($SignInButton);
            q($LoadingText);
            Wa(Rd + a, function(a) {
                $UserEmail.innerHTML = a;
                q($LoadingText)
            }, function() {
                $UserEmail.innerHTML = "<i>Failed to sign in.</i>";
                q($LoadingText)
            });
            if (void 0 !== Ib) {
                var b = jb() + "/" + Ib;
                Xa(b, a, function(b) {
                    b = JSON.parse(b);
                    Fc(b[H], b[J], b.downloadUrl, a)
                })
            }
            b = jb() + "?q=" + encodeURIComponent("mimeType='application/vnd.google-apps.folder' and trashed=false and title='MathStudio'");
            Xa(b, a, function(b) {
                (b = JSON.parse(b)) && b.items && b.items.length ? $MathStudioFolderID.value = b.items[0].id : (b = JSON.stringify({
                    title: "MathStudio",
                    mimeType: "application/vnd.google-apps.folder"
                }),
                pd(jb(), b, a, function(a) {
                    a = JSON.parse(a);
                    $MathStudioFolderID.value = a.id
                }))
            });
            $OpenFileButton.onclick = function() {
                Ra($OpenFileViewer) ? Jb() : (Ca(),
                $OpenFileButton.className = kb + " " + P,
                $OpenFileViewer.innerHTML = "Opening files...",
                R($OpenFileViewer),
                q($MathStudio),
                Xa(jb() + "?q=" + encodeURIComponent("mimeType!='application/vnd.google-apps.folder' and trashed=false"), a, function(b) {
                    b = JSON.parse(b).items;
                    $OpenFileViewer.innerHTML = "";
                    for (var d = 0, e = b.length; d < e; d++) {
                        var f = b[d]
                          , n = f.title.replace(xa, "&#8203;" + xa)
                          , m = u()
                          , n = S(I, n)
                          , l = u();
                        l.appendChild(m);
                        l.appendChild(n);
                        l.onclick = function(b) {
                            return function() {
                                var c = b[J].replace(xa, "");
                                q($ImportFile);
                                Fc(b[H], c, b.downloadUrl, a)
                            }
                        }(f);
                        $OpenFileViewer.appendChild(l)
                    }
                    R($ImportFile)
                }, function() {
                    $OpenFileViewer.innerHTML = $("googleDriveError").innerHTML
                }))
            }
            ;
            $SaveFileButton.onclick = function() {
                for (var b = [], d = va(), e = 0, f = d.length; e < f; e++) {
                    var n = d[e];
                    b.push({
                        e: n.id,
                        i: encodeURIComponent(T(n).value),
                        o: encodeURIComponent(aa(n).innerHTML)
                    })
                }
                b = JSON.stringify(b);
                f = window.btoa(b);
                $SaveFileButton.innerHTML = "<i>Saving...</i>";
                $SaveFileTextField.className = "saved-file-box";
                var m, n = $SaveFileTextField.textContent, e = $(Ja).value;
                m = $MathStudioFolderID.value;
                b = Sd;
                d = "https://www.googleapis.com/upload/drive/v2/files";
                e && (b = "PUT",
                d += "/" + e);
                var e = "application/octet-stream"
                  , l = {};
                l[J] = n;
                l.mimeType = e;
                m && (l.parents = [{
                    kind: "drive#fileLink",
                    id: m
                }]);
                f = "\r\n---------314159265358979323846\r\nContent-Type: application/json\r\n\r\n" + JSON.stringify(l) + "\r\n---------314159265358979323846\r\nContent-Type: " + e + "\r\nContent-Transfer-Encoding: base64\r\n\r\n" + f + "\r\n---------314159265358979323846--";
                e = 'multipart/mixed; boundary="-------314159265358979323846"';
                b = Va(b, d, function(a) {
                    a = JSON.parse(a);
                    Hb(a.id, a.title);
                    $SaveFileButton.innerHTML = "Saved"
                }, function(a) {
                    $SaveFileButton.innerHTML = "<b>Failed</b>";
                    alert(a)
                });
                b.setRequestHeader("Content-type", e);
                b.setRequestHeader("Authorization", "Bearer " + a);
                b.send(f)
            }
        } else
            q($FileMenu),
            R($SignInButton),
            q($LoadingText)
    }
    function Jb() {
        q($OpenFileViewer);
        q($ImportFile);
        R($MathStudio);
        $OpenFileButton.className = kb
    }
    function Ca() {
        $AboutViewer && (q($AboutViewer),
        R($MathStudio),
        $MathStudioButton && ($MathStudioButton.className = kb))
    }
    function ea(a, b) {
        Wb(na);
        qd();
        q($Manual);
        void 0 === a && $SaveFileTextField && ($SaveFileTextField.innerHTML = Ya);
        var c = null;
        $Search ? ($Search.innerHTML = "",
        c = z(v),
        c.type = K,
        c.setAttribute("placeholder", "Search Entries..."),
        $Search.appendChild(c),
        $Search.appendChild(u())) : c = document.body.querySelector(v);
        c[hb] = function(a) {
            var b = a.target.value;
            a = va();
            var c = []
              , n = 0;
            if (1 == b.length)
                for (var m = 0, l = a.length; m < l; m++) {
                    var g = T(a[m])
                      , g = g.value;
                    (g = g.length && g[0] == b ? 0 : 1) || n++;
                    c.push(g)
                }
            else
                for (m = 0,
                l = a.length; m < l; m++)
                    g = T(a[m]),
                    g = g.value,
                    (g = -1 == g.indexOf(b) ? 1 : 0) || n++,
                    c.push(g);
            m = 0;
            for (l = a.length; m < l; m++)
                b = a[m],
                g = c[m],
                b = +b.id,
                g ? q($(b)) : R($(b)),
                n = {},
                n[p] = $a,
                n[H] = b,
                n[ja] = !g,
                D(n)
        }
        ;
        Hb(b, a)
    }
    function Fc(a, b, c, d) {
        b = b.replace(xa, "");
        $OpenFileViewer.innerHTML = "Opening " + b + xa;
        $OpenFileViewer.innerHTML += "&hellip;";
        Xa(c, d, function(c) {
            ea(b, a);
            c = JSON.parse(c);
            Ka(c, !0)
        })
    }
    function Ka(a, b) {
        for (var c = rb(), d = document.createDocumentFragment(), e = 0, f = a.length; e < f; e++) {
            var n = a[e]
              , m = +n.e
              , l = n.i;
            try {
                l = decodeURIComponent(l)
            } catch (k) {
                console.log(l)
            }
            var g = n.o ? decodeURIComponent(n.o) : "";
            0 === l.indexOf("private function ") ? l = l.replace("private function ", "!@") : 0 === l.indexOf("function ") && (l = l.replace("function ", "@"));
            var l = l.b("#pi", "@pi")
              , l = l.b("#i", "@i")
              , l = l.b("#e", "@e")
              , l = l.b("#E", "@E")
              , l = l.b("#inf", "@inf")
              , l = l.b("#degree", "@degree")
              , l = l.b("#theta", "@theta")
              , l = l.b("#phi", "@phi")
              , u = c.cloneNode(!0);
            qb(u, m);
            var h = T(u);
            h.value = l;
            Ia(h, !0);
            ec(h);
            var r = aa(u);
            r.innerHTML = g;
            "" != g && (r.className = C);
            ab(r);
            d.appendChild(u);
            g = {};
            g[p] = v;
            g[v] = l;
            g[H] = m;
            b && D(g);
            $Search && Gc(m, Kb(h));
            M(v + m, n.i);
            M(C + m, n.o)
        }
        $MathStudio.appendChild(d);
        Jb();
        Ba();
        n = a[0];
        m = +n.e;
        ia(m)
    }
    function Lb(a, b) {
        var c = !1
          , d = !1;
        if (!a || 3 !== a.indexOf("MathStudio") && 2 !== a.indexOf("SpaceTime"))
            a ? c = JSON.parse(a) : (ea(),
            sa());
        else {
            for (var e = function(a) {
                return "0" == f(a) ? "" : f(a)
            }, f = function(a) {
                if (a = a[k++])
                    return a.trim();
                d = !0;
                return ""
            }, n = "(@pi) (@i) @E (@gamma) @inf @deg @phi @theta (@e) sqrt Integrate".split(" "), m = [136, 221, 137, 138, 172, 176, 189, 229, 220, 135, 132], l = m.length, g = 0; g < l; g++)
                m[g] = String.fromCharCode(m[g]);
            var k = 0
              , h = a.split(/\n/);
            e(h);
            f(h);
            f(h);
            for (var r = +f(h), u = String.fromCharCode(1), k = k + r, c = [], t = 0; t < r; t++) {
                f(h);
                f(h);
                e(h);
                var x = +f(h)
                  , p = "";
                if (1 == x)
                    e(h),
                    p = e(h);
                else {
                    e(h);
                    for (var w = e(h), p = w, q = 0, v = 0, g = 1; g < x; g++)
                        v = Ha(w),
                        1 != v && 2 != v || q++,
                        e(h),
                        w = e(h),
                        v = Ha(w),
                        -1 != v && 2 != v || q--,
                        p += "\n",
                        0 < q && (p += Array(q + 1).join(" ")),
                        p += w
                }
                p = p.b("@", "@_");
                for (g = 0; g < l; g++)
                    q = m[g],
                    -1 != p.indexOf(q) && (p = p.b(q, n[g]));
                x = +f(h);
                w = +f(h);
                g = +f(h);
                for (q = 0; q < g; q++)
                    switch (v = +h[k++],
                    f(h),
                    f(h),
                    v) {
                    case 2:
                        f(h);
                        break;
                    case 3:
                    case 4:
                    case 11:
                    case 12:
                    case 13:
                    case 16:
                        e(h)
                    }
                for (var v = e(h), z = e(h), g = 0; g < l; g++)
                    q = m[g],
                    -1 != z.indexOf(q) && (z = z.b(q, n[g]));
                f(h);
                f(h);
                e(h);
                e(h);
                f(h);
                v && z && (p = (w ? "!" : "") + "@" + v + "(" + z + ")\n" + p);
                if (d)
                    break;
                c.push({
                    e: x + 1,
                    i: encodeURIComponent(p),
                    o: ""
                });
                for (f(h); f(h)[0] != u && k < h.length; )
                    ;
            }
        }
        c && (ea(b),
        Ka(c, !0))
    }
    function lb(a) {
        q($Catalog);
        q($Options);
        q($Search);
        q($Help);
        var b = $FrameRightTop;
        if (b)
            for (var b = b.children, c = 0, d = b.length; c < d; c++) {
                var e = b[c];
                e.className = e.textContent == a ? P : ""
            }
        a && (b = $(a),
        ya && ($Catalog == b ? 0 == b.children.length && Td(ya[b.id]) : $Options == b ? 0 == b.children.length && Ud(ya[b.id]) : $Help == b && 0 == b.children.length && Vd(ya[b.id])),
        R(b),
        M(U, a))
    }
    function Kb(a) {
        return "" == a.value ? " " : a.value.split(/\n/)[0]
    }
    function Gc(a, b) {
        var c = u();
        c.id = "s" + a;
        c.innerHTML = b;
        c.onclick = function() {
            var b = $(a);
            b.parentNode.parentNode.scrollTop = b.offsetTop
        }
        ;
        var d = $Search.children[1];
        d && d.appendChild(c)
    }
    function ud(a) {
        var b = +Q(a).id
          , c = $("s" + b);
        c ? c.innerHTML = Kb(a) : Gc(b, Kb(a))
    }
    function Hc(a) {
        if (ta()) {
            var b = ta();
            a = a.textContent.split(";").map(function(a) {
                return a.trim()
            }).join("\n");
            b.value = a;
            Ia(b, !0);
            b = Ea(b);
            gc(b)
        }
    }
    function Td(a) {
        var b = z(v);
        b.type = K;
        b.setAttribute("placeholder", "Search Functions...");
        $Catalog.appendChild(b);
        b[hb] = function(a) {
            for (var b = $Catalog.querySelectorAll(U), c = $Catalog.querySelectorAll(A(Mb)), d = 0, l = c.length; d < l; d++)
                b[d].className = "",
                q(c[d]);
            var g = a.target.value;
            a = [];
            c = 0;
            if (1 == g.length)
                for (d = 0,
                l = b.length; d < l; d++) {
                    var k = b[d].textContent;
                    (k = k.length && k[0] == g ? 0 : 1) || c++;
                    a.push(k)
                }
            else
                for (g = new RegExp(g,"i"),
                d = 0,
                l = b.length; d < l; d++)
                    (k = -1 == b[d].textContent.search(g) ? 1 : 0) || c++,
                    a.push(k);
            d = 0;
            for (l = b.length; d < l; d++)
                c = b[d],
                a[d] ? q(c) : R(c)
        }
        ;
        for (var c in a)
            if (a.hasOwnProperty(c)) {
                var b = u()
                  , d = u();
                d.innerHTML = c;
                b.appendChild(d);
                $Catalog.appendChild(b);
                Wd(a[c], b)
            }
    }
    function Xd(a, b, c) {
        var d = z(U);
        d.innerHTML = b[bb];
        d.onclick = function() {
            0 == a.children.length && Yd(a, b, c);
            a.style.display = "none" == a.style.display ? "block" : "none";
            d.className = Ra(a) ? P : ""
        }
        ;
        return d
    }
    function Wd(a, b) {
        for (var c = 0, d = a.length; c < d; c++) {
            var e = a[c]
              , f = e.parameters
              , n = []
              , m = f ? f.length : 0
              , l = u();
            l.className = Mb;
            q(l);
            e = Xd(l, e, f);
            b.appendChild(e);
            b.appendChild(l);
            for (l = 0; l < m; l++)
                n.push(f[l][bb]);
            n.length && (f = z(Fb),
            f.innerHTML = "(" + n.join(", ") + ")",
            e.appendChild(f))
        }
    }
    function Yd(a, b, c) {
        for (var d = c ? c.length : 0, e = u(), f = 0; f < d; f++) {
            var n = c[f];
            if (n[K]) {
                var m = u();
                m.innerHTML = n[bb];
                e.appendChild(m);
                m = u();
                m.innerHTML = n[K];
                e.appendChild(m)
            }
        }
        e.children.length && (e.className = "parameters",
        a.appendChild(e));
        f = S(I, b.description);
        c = u();
        c.className = "description";
        d = S(I, "description".va());
        c.appendChild(d);
        c.appendChild(f);
        a.appendChild(c);
        c = (b = b.examples) ? b.length : 0;
        for (f = 0; f < c; f++) {
            e = b[f];
            n = u();
            m = S(I, e[J]);
            d = u();
            n.className = "examples";
            n.appendChild(m);
            n.appendChild(d);
            a.appendChild(n);
            for (var e = e.rows, n = z("ul"), m = 0, l = e.length; m < l; m++) {
                var g = z(U);
                g.innerHTML = e[m];
                g.onclick = function() {
                    Hc(this)
                }
                ;
                var k = z("li");
                k.appendChild(g);
                n.appendChild(k)
            }
            d.appendChild(n)
        }
    }
    function Nb() {
        var a;
        a = $Options.querySelectorAll("." + P);
        for (var b = [], c = 0, d = a.length; c < d; c++)
            a[c].type == wa ? b.push(+a[c].checked) : b.push(+a[c].value);
        a = b.join(" ");
        M(ba, a);
        b = {};
        b[p] = ba;
        b[v] = a;
        D(b)
    }
    function Ud(a) {
        for (var b = window[X + ba] ? window[X + ba] : localStorage.getItem(ba), b = b ? b.split(" ") : 0, c = 0, d = 0; d < a.length; d++) {
            var e = a[d]
              , f = e.control
              , k = e[yb]
              , m = e[ja]
              , l = e[K]
              , g = u();
            g.innerHTML = e[J];
            var p = u();
            p.appendChild(g);
            p.className = ba;
            var h = null;
            if ("select" == f) {
                h = u();
                h.className = vc;
                for (var f = Math.floor(100 / k.length) + "%", g = 0, r = k.length; g < r; g++) {
                    var q = u();
                    q.innerHTML = k[g];
                    q.style.width = f;
                    q.value = g;
                    b ? g == +b[c] && (q.className = P) : void 0 !== e[ja] ? g == m && (q.className = P) : 0 == g && (q.className = P);
                    q.onclick = function(a) {
                        a = a.currentTarget;
                        for (var b = a.parentNode, c = 0, d = b.children.length; c < d; c++)
                            b.children[c].className = "";
                        a.className = P;
                        Nb()
                    }
                    ;
                    h.appendChild(q)
                }
            } else
                f == gb ? (p.className += " " + gb,
                f = z(v),
                f.type = gb,
                f.className = P,
                f.min = 0,
                f.max = k.length - 1,
                f.step = 1,
                h = u(),
                h.appendChild(f),
                b ? (f.value = +b[c],
                e = f.value) : (e = 0,
                m && (m = k.indexOf(m),
                ~m && (e = m,
                f.value = e))),
                m = u(),
                m.innerHTML = k[e],
                p.appendChild(m),
                function(a, b) {
                    h.oninput = function(c) {
                        a.innerHTML = b[c.target.value];
                        Nb()
                    }
                }(m, k)) : f == wa ? (p.className += " " + wa,
                k = z(v),
                k.type = wa,
                k.className = P,
                k.checked = b ? +b[c] : m,
                h = u(),
                h.appendChild(k),
                function() {
                    h.onchange = function() {
                        Nb()
                    }
                }()) : (h = z(v),
                h.type = value);
            p.appendChild(h);
            $Options.appendChild(p);
            void 0 !== l && (l = S(I, l),
            $Options.appendChild(l));
            l = z("hr");
            l.className = ba;
            $Options.appendChild(l);
            c++
        }
    }
    function Vd(a) {
        for (var b = 0, c = a.length; b < c; b++) {
            var d = a[b];
            $Help.appendChild(S(I, d[J]));
            for (var d = d.examples, e = 0, f = d.length; e < f; e++) {
                var k = d[e].b("\n", "\n<br>")
                  , k = S(U, k);
                $Help.appendChild(k).onclick = function() {
                    Hc(this)
                }
            }
        }
    }
    var I = k(":5(")
      , ha = k("*9&*=,9=")
      , Gd = k("*,=0+8/,1");
    k(",9;*");
    var Hd = k("*,=0+2=*9")
      , C = k("/)*.)*")
      , F = k("90*,%")
      , P = k("+929;*9:")
      , kc = F + " " + P
      , v = k("50.)*")
      , Za = k("+50729")
      , V = k(".2/*")
      , Dc = k("1)2*5")
      , K = k("*9&*");
    k(".=*6");
    var da = k("'5:*6")
      , qa = k("69576*")
      , Qa = k("8)0;*5/0");
    k("p+;,/22=<29");
    var zb = k("=051=*9")
      , yb = k("(=2)9+")
      , Yb = k("&")
      , Zb = k("%")
      , gb = k(",=079");
    k("K9,(9,~Y,,/,d");
    var Sd = k("NOKJ");
    k("WYJ");
    var U = k("<)**/0")
      , Ya = k("I0*5*29:")
      , tb = k("Y0*,%~P)1<9,+")
      , Id = k("1=.")
      , J = k("*5*29")
      , Xb = k("+;,5.*+")
      , Fb = k("+.=0")
      , Ec = k("K=(9")
      , $a = k("+6/'")
      , ca = k("*,=;9")
      , pa = k("$//1")
      , G = k("8)22+;,990")
      , cb = k("7//729Q=.+");
    k(":=*=q0)1<9,");
    var p = k(";/1.)*9")
      , bb = k("0=19")
      , oa = k(";/0*,/2+")
      , db = k(";=0(=+")
      , md = k("'9<72")
      , X = k("8529")
      , ba = k("/.*5/0+")
      , Ob = k("Q=*6K*):5/")
      , fc = k("x0<+.c")
      , xa = k("p1=*6")
      , Zd = k("=;*5(=*9Y29190*")
      , kb = k("190)q5*91")
      , H = k("5:")
      , hb = k("/050.)*")
      , wa = k(";69;3</&")
      , ja = k("(=2)9")
      , Da = k("2/;=2")
      , pc = k("+(7")
      , Mb = k("1=0)=2")
      , ra = k(";29=,")
      , jd = k("+*=,*")
      , Pb = k("2=07)=79")
      , Md = k("9&.,9++5/0")
      , $d = k("502509")
      , Ja = k("8529UZ")
      , kd = k("M'li)Vf*ZHV6PO<")
      , Ld = k("E/),~<,/'+9,~:/9+~0/*~+)../,*~G9<WRp")
      , Rd = k("o50;2):9o=)*690*5;=*9p.6._=;;9++?*/390a")
      , vc = k("+97190*9:q<=,");
    kSurfaceTextLookupTable = JSON.parse('{"A":",-0.00","B":",0.00","C":",-0.0","D":",0.0","E":",-0.","F":",0.","G":",0","H":",","_":",_"}');
    kSurfaceTextReadPattern = function() {
        var a = "", b;
        for (b in kSurfaceTextLookupTable)
            kSurfaceTextLookupTable.hasOwnProperty(b) && (a += b + "|");
        return new RegExp(a.slice(0, -1),"g")
    }();
    $ = function(a) {
        return document.getElementById(a)
    }
    ;
    encryptElement = function(a) {
        return $(k(a))
    }
    ;
    $MathStudio = encryptElement("Q=*6K*):5/");
    $FileMenu = encryptElement("8529Q90)");
    $MathStudioButton = encryptElement("1=*6K*):5/\\)**/0");
    $AboutViewer = encryptElement("=</)*H59'9,");
    $OpenFileButton = encryptElement("/.90X529\\)**/0");
    $SaveFileTextField = encryptElement("+=(9X529J9&*X592:");
    $SaveFileButton = encryptElement("+=(9X529\\)**/0");
    $UploadFile = encryptElement(").2/=:X529");
    $OpenFileViewer = encryptElement("8529H59'9,");
    $ImportFile = encryptElement("51./,*X529");
    $SignInButton = encryptElement("+570U0\\)**/0");
    $UserEmail = encryptElement(")+9,Y1=52");
    $ShareLinkText = encryptElement("+6=,9R503J9&*");
    $LoadingText = encryptElement("2/=:507J9&*");
    $Computing = encryptElement(";/1.)*507");
    $MathStudioFolderID = encryptElement("1=*6K*):5/X/2:9,UZ");
    $FrameRightTop = encryptElement("8,=19L576*J/.");
    $Catalog = ($FrameRight = encryptElement("8,=19L576*")) ? $FrameRight.children[0] : 0;
    $Search = $FrameRight ? $FrameRight.children[1] : 0;
    $Options = $FrameRight ? $FrameRight.children[2] : 0;
    $Help = $FrameRight ? $FrameRight.children[3] : 0;
    $Manual = $(Mb);
    $Fullscreen = $(G + "-" + F);
    encryptElement = k = void 0;
    var ka = 0
      , Bc = function() {
        var a = !!window.opera || 0 <= navigator.userAgent.indexOf(" OPR/")
          , b = "undefined" !== typeof InstallTrigger
          , c = !!window.chrome && !a
          , d = Object.hasOwnProperty.call(window, "ActiveXObject") && !window.ActiveXObject
          , e = 0 < Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") && void 0 != document.hidden;
        return a || b || c || e || d
    }()
      , na = null;
    String.prototype.va = function() {
        return this.charAt(0).toUpperCase() + this.slice(1)
    }
    ;
    String.prototype.b = function(a, b) {
        return this.replace(new RegExp(a,"g"), b)
    }
    ;
    String.prototype.fa = function(a) {
        for (var b = 0, c = 0; ; ) {
            c = this.indexOf(a, c);
            if (-1 == c)
                break;
            b++;
            c += a.length
        }
        return b
    }
    ;
    window.onresize = function() {
        Z ? window.setTimeout(oc, 100) : oc()
    }
    ;
    var Ic = $("AskMathStudio");
    if (Ic) {
        var B = document.querySelector(v);
        B.focus();
        q($MathStudioButton);
        var Jc = document.querySelectorAll(U)
          , la = Jc[0]
          , ae = Jc[1]
          , Db = $("AskProcessing")
          , La = $(C);
        typeof window[p] == Qa ? window[p + C] = function(a, b, c, d, e) {
            var f = {};
            f[H] = a;
            f[v] = b;
            f[C] = c;
            f[Da] = d;
            f[G] = e;
            pb(f);
            zc(f)
        }
        : na = ob(zc);
        var L = {};
        L[p] = ba;
        L[v] = "8 2 0 0 0";
        D(L);
        var Ma = function() {
            var a = B.value;
            if (a.length && a != Qb) {
                B.value = "";
                0 == document.querySelectorAll(A(C)).length && (La.innerHTML = "");
                var b = sb() + 1
                  , c = u();
                c.className = F;
                c.id = b;
                var d = u();
                d.className = v;
                c.appendChild(d);
                var e = u();
                e.innerHTML = a;
                d.appendChild(e);
                d.appendChild(u());
                var f = u();
                wb(f, function() {
                    f.innerHTML = $Computing ? $Computing.innerHTML : ""
                });
                f.className = C;
                f.innerHTML = "";
                c.appendChild(f);
                La.children[0] ? La.insertBefore(c, La.children[0]) : La.appendChild(c);
                c = {};
                c[p] = Pb;
                c[v] = a;
                c[H] = b;
                D(c)
            }
        }
          , Kc = window[X + K];
        if (Kc) {
            for (var Lc = JSON.parse(Kc), w = Lc.length - 1; 0 <= w; w--)
                B.value = Lc[w],
                Ma();
            B.value = ""
        }
        la.onclick = function() {
            B.disabled ? (Rb.Aa(),
            B.value = "",
            B.disabled = !1,
            la.innerHTML = "Speak",
            la.className = "") : (Rb.ia(),
            B.disabled = !0,
            B.value = "",
            la.innerHTML = "Stop",
            la.className = "recording")
        }
        ;
        B.onkeypress = function(a) {
            13 === a.keyCode && Ma()
        }
        ;
        ae.onclick = function() {
            Ma()
        }
        ;
        for (var Mc = Ic.querySelectorAll("a.example"), w = 0, N = Mc.length; w < N; w++)
            Mc[w].onclick = function(a) {
                a = a.currentTarget.innerHTML;
                B.value = a;
                Ma();
                B.value = a
            }
            ;
        var Qb = "Start speaking..."
          , Rb = new Nd(function() {
            B.value = Qb;
            B.parentNode.style.backgroundColor = "#eee"
        }
        ,function(a) {
            R(Db);
            B.value = a
        }
        ,function() {
            Ma();
            q(Db);
            B.value = Qb;
            B.parentNode.style.backgroundColor = "white"
        }
        );
        void 0 === Rb.ia ? q(la) : la.style.display = "inline-block"
    } else {
        if ($SignInButton) {
            var Sb = z("script");
            Sb.src = "https://apis.google.com/js/client.js?onload=handleClientLoad";
            Sb.type = "text/javascript";
            document.body.appendChild(Sb);
            window.handleClientLoad = function() {
                window.setTimeout(Ac, 1)
            }
            ;
            $SignInButton.onclick = function() {
                Ac(!1)
            }
        }
        if ($MathStudio) {
            var Ib = void 0;
            document[hb] = function(a) {
                a.target.tagName.toLowerCase() == ha && Ia(a.target)
            }
            ;
            document.onkeydown = function(a) {
                $SaveFileButton && ($SaveFileButton.innerHTML = Ec);
                var b = a.target;
                if (13 === a.keyCode) {
                    if (a.shiftKey && !event.ctrlKey && !event.altKey)
                        return !0;
                    if (a.ctrlKey && !a.shiftKey && !event.altKey)
                        return Ia(b, !0),
                        !1;
                    a = +Q(b).id;
                    b.value.length ? ($(a),
                    Ea(b)) : (b = aa($(a)),
                    b.innerHTML = "",
                    b.className = C + " " + ra);
                    gc(a);
                    return !1
                }
                if (8 === a.keyCode)
                    return !0 === a.ctrlKey ? (jc(),
                    !1) : !0;
                if (187 === a.keyCode)
                    return !0 === a.ctrlKey ? (ic(),
                    !1) : !0
            }
            ;
            this.insertText = function(a) {
                var b = ka
                  , c = b.selectionStart;
                b.value = b.value.substring(0, c) + a + b.value.substring(b.selectionEnd, b.value.length);
                b.focus();
                b.selectionStart = c + a.length;
                b.selectionEnd = c + a.length;
                Ia(b)
            }
            ;
            bc("touchscreen").disabled = Z;
            bc(G).disabled = !0;
            var ya = null;
            $FrameRight && Wa(Ob.toLowerCase() + ".json?56789012", function(a) {
                ya = JSON.parse(a);
                a = localStorage.getItem(U);
                null != a ? lb(a) : lb($Help.id)
            });
            var Nc = $("newFileButton");
            Nc && (Nc.onclick = function() {
                ea();
                sa();
                localStorage.clear()
            }
            );
            var Oc = $("openLocalFileButton");
            Oc && (Oc.onclick = function() {
                Lb(window[X + K], window[X + J]);
                for (var a = E(), b = 0, c = a.length; b < c; b++)
                    Ea(T($(a[b])))
            }
            );
            $SaveFileTextField && ($SaveFileTextField.onkeydown = function(a) {
                return 13 === a.keyCode ? ($SaveFileButton.onclick.apply($SaveFileButton),
                !1) : !0
            }
            );
            var Pc = $("fileCommands");
            if (Pc) {
                var Na = Pc.querySelectorAll(U)
                  , Qc = Na[0];
                Qc && (Qc.onclick = ic);
                var Rc = Na[1];
                Rc && (Rc.onclick = jc);
                var Sc = Na[2];
                Sc && (Sc.onclick = rd);
                var Tc = Na[3];
                Tc && (Tc.onclick = function() {
                    Ca();
                    for (var a = E(), b = 0, c = a.length; b < c; b++)
                        Ea(T($(a[b])))
                }
                );
                var Uc = Na[4];
                Uc && (Uc.onclick = function() {
                    for (var a = E(), b = 0, c = a.length; b < c; b++) {
                        var d = {};
                        d[p] = Xb;
                        d[H] = a[b];
                        d[v] = T($(entryNumber));
                        D(d)
                    }
                }
                )
            }
            $UploadFile && ($UploadFile.onchange = function(a) {
                a = a.currentTarget.files[0];
                var b = a.name.replace(xa, "")
                  , c = new FileReader;
                c.onload = function(a) {
                    Lb(a.target.result, b)
                }
                ;
                c.readAsBinaryString(a)
            }
            );
            var mb = $("shortURL");
            $MathStudioButton && ($MathStudioButton.onclick = function() {
                if (Ra($AboutViewer))
                    Ca();
                else {
                    var a = $("shareFile"), b;
                    a: {
                        b = E();
                        for (var c = 0; c < b.length; c++)
                            if ("" != T($(b[c])).value) {
                                b = !0;
                                break a
                            }
                        b = !1
                    }
                    b ? R(a) : q(a);
                    Jb();
                    $MathStudioButton.className = kb + " " + P;
                    R($AboutViewer);
                    q($MathStudio);
                    a = $ShareLinkText;
                    b = window.location.href.split("/");
                    b = b[0] + "//" + b[2] + "/?" + dc();
                    a.innerHTML = b;
                    R(mb)
                }
            }
            );
            mb && (mb.onclick = function() {
                $ShareLinkText.innerHTML = "Shortening URL...";
                q(mb);
                od({
                    link: dc()
                }, function(a) {
                    $ShareLinkText.innerHTML = a
                })
            }
            );
            var Vc = $("compileScriptsButton");
            Vc && (Vc.onclick = function() {
                for (var a = va(), b = [], c = 0, d = a.length; c < d; c++)
                    b.push(a[c].querySelector(ha).value);
                D({
                    compile: b
                })
            }
            );
            var Wc = $("toggleCatalogButton");
            Wc && (Wc.onclick = function() {
                var a = !$(G).disabled;
                $(G).disabled = a;
                M("Sidebar", +a)
            }
            );
            if ($FrameRightTop)
                for (var Xc = $FrameRightTop.children, w = 0, N = Xc.length; w < N; w++)
                    Xc[w].onclick = function(a) {
                        lb(a.target.textContent)
                    }
                    ;
            var Yc = localStorage.getItem("Sidebar");
            null != Yc && ($(G).disabled = +Yc);
            if (typeof window[p] == Qa)
                window[X + J] && window[X + K] ? (Lb(window[X + K], window[X + J]),
                window[X + "ShowTips"] && (document.querySelector(ha).placeholder = "Press Shift + Enter to create a new line.")) : (ea(),
                sa()),
                window[p + C] = function(a, b, c, d, e) {
                    var f = {};
                    f[H] = a;
                    f[v] = b;
                    f[C] = c;
                    f[Da] = d;
                    f[G] = e;
                    pb(f)
                }
                ;
            else {
                $MathStudio && (na = ob(function() {}));
                Ua($MathStudio);
                var Zc = $MathStudio.dataset.state
                  , N = $MathStudio.dataset.entries
                  , $c = "0" != $MathStudio.dataset[p]
                  , ad = $MathStudio.dataset.file;
                if (Zc) {
                    var bd = JSON.parse(Zc);
                    "open" == bd.action && (Ib = bd.ids[0],
                    $OpenFileViewer.innerHTML = "Opening file...",
                    R($OpenFileViewer),
                    q($MathStudio))
                } else if (0 < N) {
                    for (var ma = [], fa = [], w = 0; w < N; w++) {
                        var O = w + 1
                          , cd = decodeURIComponent($MathStudio.dataset[v + (w + 1)])
                          , dd = "";
                        try {
                            dd = decodeURIComponent(atob(cd))
                        } catch (a) {
                            console.log(cd)
                        }
                        var be = encodeURIComponent(dd.b(";", "\n"));
                        ma.push({
                            e: O,
                            i: be,
                            o: ""
                        });
                        fa.push(O)
                    }
                    O = N + 1;
                    ma.push({
                        e: O,
                        i: "",
                        o: ""
                    });
                    fa.push(O);
                    var Oa = $MathStudio.dataset[J];
                    Oa || (Oa = Ya);
                    ea(Oa);
                    Ka(ma, $c);
                    $c && td(fa)
                } else if (ad)
                    Wa(ad, function(a) {
                        a = JSON.parse(a);
                        Ka(a, !0)
                    });
                else if (localStorage.getItem(tb)) {
                    var Oa = localStorage.getItem(J)
                      , ce = localStorage.getItem(Ja)
                      , fa = JSON.parse(localStorage.getItem(tb));
                    ea();
                    if (null !== fa && fa.length) {
                        ma = [];
                        w = 0;
                        for (N = fa.length; w < N; w++) {
                            var O = fa[w]
                              , Pa = localStorage.getItem(v + O)
                              , de = localStorage.getItem(C + O);
                            null === Pa ? ma.push({
                                e: O,
                                i: "",
                                o: ""
                            }) : ma.push({
                                e: O,
                                i: Pa,
                                o: de
                            })
                        }
                        Hb(ce, Oa);
                        Ka(ma, !0)
                    } else
                        sa()
                } else
                    ea(),
                    sa()
            }
        } else {
            this[Zd] = function(a) {
                ab(a)
            }
            ;
            this[p] = function(a, b) {
                var c = {};
                c[p] = Pb;
                c[v] = a;
                c[H] = void 0 === b ? 1 : b;
                c[ra] = !0;
                c[$d] = !0;
                D(c)
            }
            ;
            var Fa = document.querySelector(A(Ob));
            if (Fa) {
                var na = ob(function() {})
                  , ed = Fa == document.querySelector(A("language"));
                ed && (L = {},
                L[p] = ba,
                L[v] = "5 0 0 0 0",
                D(L));
                for (var fd = Fa.querySelectorAll(A(v)), ee = Fa.querySelectorAll(A(C)), gd = $Computing ? $Computing.innerHTML : "", w = 0, N = fd.length; w < N; w++) {
                    var Tb = fd[w]
                      , Pa = Tb.textContent
                      , L = {};
                    if (gd) {
                        var fe = Qd(Pa);
                        Tb.innerHTML = "";
                        Tb.appendChild(fe);
                        ee[w].innerHTML = gd
                    } else
                        L[ra] = 1;
                    L[p] = ed ? Pb : K;
                    L[v] = Pa;
                    L[H] = w + 1;
                    D(L)
                }
            }
            var nb = document.querySelector(".grid-view");
            if (nb) {
                var Ub = function(a) {
                    for (var b = a.W, c = a.ta, d = a.U, e = a.children, f = e.length, k = [], m = 0; m < f; m++)
                        k.push(e[m].offsetHeight + c);
                    for (var l = c, g = new Int32Array(32), m = 0; m < f; m++) {
                        var p = m % d;
                        0 == p && (l = c);
                        var h = e[m]
                          , q = c + g[p];
                        h.style.left = +l + "px";
                        h.style.top = +q + "px";
                        h.style.visibility = "visible";
                        l += b + c;
                        g[p] += k[m]
                    }
                    e = ac(g);
                    a.style.width = +(b * d + c * (d + 1)) + "px";
                    a.style.height = +e + "px"
                }
                  , hd = function(a) {
                    Ua(a);
                    var b = +a.dataset[da]
                      , c = +a.dataset.margin
                      , d = +a.dataset.rows;
                    d || (d = 5);
                    a.W = b;
                    a.ta = c;
                    a.Ka = d;
                    b = Math.floor((a.parentNode.offsetWidth - c) / (b + c));
                    return b != a.U ? (a.U = b,
                    !0) : !1
                };
                window.onresize = function() {
                    hd(nb) && Ub(nb)
                }
                ;
                (function(a) {
                    if (!hd(a))
                        return !1;
                    for (var b = a.W, c = a.children, d = c.length, e = 0; e < d; e++) {
                        var f = c[e];
                        f.style.width = +b + "px";
                        Ua(f);
                        var k = f.dataset.img;
                        (f = f.querySelector("img")) ? (f.src = k,
                        f.onload = function() {
                            Ub(a)
                        }
                        ) : Ub(a)
                    }
                    return !0
                })(nb)
            }
            $Options && Wa(Ob.toLowerCase() + ".json?56789012", function(a) {
                ya = JSON.parse(a);
                lb($Options.id)
            })
        }
    }
}
;
