const duration = 750;
let isCollapsed = true;

const el = document.querySelector(".collapse");
const btn = document.querySelector(".btn-collapse");

toggleClass(btn, "collapsed", isCollapsed);

/**
 * Collapse / expand element on click.
 */
btn.addEventListener("click", (e) => {
    e.preventDefault();
    isCollapsed = toggleCollapsed(isCollapsed);

    toggleClass(e.target, "collapsed", isCollapsed);
    showHide(e.target, isCollapsed);
    el.classList.add('opened');
});

/**
 * Changing className of the btn.
 * @param {*} element
 * @param {*} className
 * @param {*} c
 */
function toggleClass(element, className, c) {
    if (c) {
        element.classList.add(className);
    } else {
        element.classList.remove(className);
    }
}

/**
 * Toggle collapsed value.
 * @param {*} v
 * @returns
 */
function toggleCollapsed(v) {
    return !v
}

/**
 *  Collapse / expand element.
 * @param {*} element
 * @param {*} c
 */
function showHide(element, c) {
    toggleClass(element, "collapsed", c);

    if (c) {
        slideUp();
    } else {
        slideDown();
    }
}

/**
 * Increasing height of the Collapse element.
 *
 * @param {*} el
 * @param {*} progress
 */
function incrementHeight(el, progress) {
    el.style.height = `${progress * el.scrollHeight}px`;
}

/**
 * Decrementing height of the Collapse element.
 *
 * @param {*} el
 * @param {*} progress
 */
function decrementHeight(el, progress) {
    el.style.height = `${el.scrollHeight - progress * el.scrollHeight}px`;
    el.style.overflow = "hidden";
}

/**
 * Expanding Collapse element.
 */
function slideDown() {
    const start = performance.now();

    requestAnimationFrame(function animate(time) {
        const runtime = time - start;
        const relativeProgress = runtime / duration;
        const process = Math.min(relativeProgress, 1);

        if (process < 1) {
            incrementHeight(el, process);
            requestAnimationFrame(animate);
        }

        if (process === 1) {
            el.style.height = "700";
            el.style.overflow = "initial";
        }
    });
}

/**
 * Collapsing element.
 */
function slideUp() {
    const start = performance.now();
    requestAnimationFrame(function animate(time) {
        const runtime = time - start;
        const relativeProgress = runtime / duration;
        const process = Math.min(relativeProgress, 1);
        if (process < 1) {
            decrementHeight(el, process);
            requestAnimationFrame(animate);
        }
        if (process === 1) {
            el.style.height = "";
            el.style.overflow = "";
        }
    });
}