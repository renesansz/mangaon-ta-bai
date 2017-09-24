/**
 * Helper method.
 */
var Helper = (function () {

    var statusEle = document.querySelector(".status");

    return {
        setClickListener: setClickListener,
        hideElement: hideElement,
        showElement: showElement,
        hideStatus: hideStatus,
        setStatus: setStatus
    };

    /* ======= FUNCTION DEFINITIONS ======= */

    /**
     * Set a click listener w/ callback to the element.
     *
     * @param {string} query
     * @param {function} callback
     * @param {boolean} isMultiple - Optional
     */
    function setClickListener(query, callback, isMultiple) {
        if (isMultiple) {
            document.querySelectorAll(query).forEach(function (ele) {
                ele.addEventListener("click", callback);
            });
        } else {
            document.querySelector(query).addEventListener("click", callback);
        }
    }

    /**
     * Show and set status text display.
     *
     * @param {string} text
     */
    function setStatus(text) {
        statusEle.classList.remove("hidden");
        statusEle.innerHTML = text;
    }

    /**
     * Hide status text display.
     */
    function hideStatus() {
        statusEle.classList.add("hidden");
    }

    /**
     * Hide an element using 'hidden' class.
     */
    function showElement(element) {
        document.querySelector(element).classList.remove("hidden");
    }

    /**
     * Hide an element using 'hidden' class.
     */
    function hideElement(element) {
        document.querySelector(element).classList.add("hidden");
    }

})();
