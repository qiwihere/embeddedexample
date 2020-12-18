const fse = require('fs-extra')
const JSDOM = require('jsdom').JSDOM;
const path = require('path')
const querySelectorAll = require('query-selector').default

const htmlContent = fse.readFileSync('build/index.html').toString()
const document = (new JSDOM(htmlContent)).window.document

function createsScriptsBundle(document, appDir){
    const scripts = querySelectorAll("script", document)
    let loaderScript='';
    let applicationScript='';
    let vendorScript='';

    scripts.forEach(v=>{
        if(v.text)
            loaderScript = v.text
        if(v.src){
            const scriptPath = v.src.replace('/static','build/static')
            const scriptName = path.basename(scriptPath)
            if(scriptPath.indexOf('main')+1)
                applicationScript = fse.readFileSync(scriptPath)
                    .toString()
                    .replace(`//# sourceMappingURL=${scriptName}.map`,'')
            else
                vendorScript = fse.readFileSync(scriptPath)
                    .toString()
                    .replace(`//# sourceMappingURL=${scriptName}.map`,'')

        }
    })
    applicationScript = applicationScript.replace(/static\/media\//gi, `${appDir}media/`)
    fse.outputFileSync(`${appDir}/bundle.js`, [loaderScript, vendorScript, applicationScript].join(";"))

}
function createStyleBundle(document, appDir){
    const links = querySelectorAll("link", document)

    let styles = '';
    links.forEach(v=>{
        if(v.rel!=="stylesheet" || v.href.indexOf('http')+1)
            return;
        if(v.href){
            const stylePath = v.href.replace('/static','build/static')
            const styleName = path.basename(stylePath)
            styles += fse.readFileSync(stylePath)
                .toString()
                .replace(`/*# sourceMappingURL=${styleName}.map */`,'')

        }
    })
    fse.outputFileSync(`${appDir}/styles.css`, styles)
}

function copyMedia(appDir){
    fse.copySync('build/static/media', `${appDir}/media`)
}

createsScriptsBundle(document, "embedded/")
createStyleBundle(document, "embedded/")
copyMedia("embedded/")