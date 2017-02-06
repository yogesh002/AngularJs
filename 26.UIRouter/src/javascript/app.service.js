/*
 *@author: Yogesh Ghimire
 */
(function() {
    angular.module("moduleApp").service("plantDetailService", PlantDetailService);

    function PlantDetailService() {
        var service = this;
        service.plantDetails = [{
                name: "rose",
                color: "red",
                smell: "sweet"
            },
            {
                name: "marygold",
                color: "yellow",
                smell: "sour"

            }
        ];
    }

})();
