/*
const ODMap = () => {
    
    // Get the OD Report data for given month
    const getReportData = async () => {
        //const response =  await fetch('/api/overdose_reports'); (need to update this route)
        return response.json();
    };

    //function to look at Date object and return the month  (0-11)


    const createPins = () => {

        //for a given month - get report data (not done yet)
        //organize data by fatal, non-fatal, reverse, and all (not done yet)

        //check report data is org or ind

        const report_data = getReportData();

        for (let i = 0; i < report_data.length; i++) {
            if (report_data[i].is_org) {
                //Get the location of the org
                const org_location = getOrgLocationByPhone(report_data[i].phone_number);

                // 1- create blue pin for org
                // 2- create 1-mile radius heatmap around org
            } else {
                //Get the location of the indv
                const ind_location = getIndLocationByPhone(report_data[i].phone_number);

                // 1- create red pin for individual
                // 2- create 5-mile radius heatmap around individual
            }
        }
    };
        
        
    return (
        <div>
        <h1>ODMap</h1>
        </div>
    );
}

export default ODMap;
*/