/**

This script help track all updates to the solr core by logging them when TRACE is enabled.

*/

function logDoc(doc) {
    if (logger.isTraceEnabled()) {
            var fieldNames = doc.getFieldNames()
            var jDoc={};
            for (var namesIter = fieldNames.iterator(); namesIter.hasNext();) {
                var fieldName = namesIter.next();
                jDoc[fieldName] = []
                var fieldValues = doc.getFieldValues(fieldName)
                for (var valIter = fieldValues.iterator(); valIter.hasNext();) {
                        fieldValue = valIter.next();
                        jDoc[fieldName].push(String(fieldValue.toString()))
                }
            }
            logger.trace("NEWDOC: " + JSON.stringify(jDoc));
     }
}


function processAdd(cmd) {
  doc = cmd.solrDoc;  // org.apache.solr.common.SolrInputDocument
  logDoc(doc);
}

function processDelete(cmd) {
  // no-op
}

function processMergeIndexes(cmd) {
  // no-op
}

function processCommit(cmd) {
  // no-op
}

function processRollback(cmd) {
  // no-op
}

function finish() {
  // no-op
}
