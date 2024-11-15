// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    const metadata = data.metadata;
    const result = metadata.find(sampleObj => sampleObj.id == sample);
    
    const panel = d3.select("#sample-metadata");
    panel.html(""); // Clear existing metadata

    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key}: ${value}`);
    });
    // get the metadata field
    // Filter the metadata for the object with the desired sample number
    // Use d3 to select the panel with id of `#sample-metadata`
    // Use `.html("") to clear any existing metadata
    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.

  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    const samples = data.samples;
    const result = samples.find(sampleObj => sampleObj.id == sample);

    // Extract the data for the bar chart
    const otu_ids = result.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    const sample_values = result.sample_values.slice(0, 10).reverse();
    const otu_labels = result.otu_labels.slice(0, 10).reverse();

    // Bar Chart
    const barData = [{
      x: sample_values,
      y: otu_ids,
      text: otu_labels,
      type: "bar",
      orientation: "h"
    }];

    const barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: { title: "Number of Bacteria" },
      yaxis: { title: "OTU ID" }
    };

    Plotly.newPlot("bar", barData, barLayout);

    // Bubble Chart
    const bubbleData = [{
      x: result.otu_ids,
      y: result.sample_values,
      text: result.otu_labels,
      mode: "markers",
      marker: {
        size: result.sample_values,
        color: result.otu_ids
      }
    }];

    const bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Number of Bacteria" },
      showlegend: false
    };

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    // Get the samples field
    // Filter the samples for the object with the desired sample number
    // Get the otu_ids, otu_labels, and sample_values
    // Build a Bubble Chart
    // Render the Bubble Chart
    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    const sampleNames = data.names;
    const selector = d3.select("#selDataset");

    sampleNames.forEach((sample) => {
      selector.append("option").text(sample).property("value", sample);
    });

    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    // Get the names field
    // Use d3 to select the dropdown with id of `#selDataset`
    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    // Get the first sample from the list
    // Build charts and metadata panel with the first sample

  });
}

// Function for event listener
function optionChanged(newSample) {
  buildCharts(newSample);
  buildMetadata(newSample);
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
