import { App, Editor, MarkdownPreviewRenderer, MarkdownPreviewView, MarkdownRenderer, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TFile } from 'obsidian';
import {processCodeBlock} from "src/deplistprocessor"

// Remember to rename these classes and interfaces!

interface DependencyTreePluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: DependencyTreePluginSettings = {
	mySetting: 'default'
}

export default class DependencyTreePlugin extends Plugin {
	settings: DependencyTreePluginSettings;

	async onload() {
		await this.loadSettings();

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');

		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));

		this.registerMarkdownCodeBlockProcessor("crtlist", (source, el, ctx) => {
			let diagram: string = ""
			const rows = source.split("\n").filter((row) => row.length > 0);
			let listText:string =""
			rows.forEach(
				(row) => {
					if (row.startsWith("diagram:")) {
						diagram = row.split(":")[1];
					} else {
						listText+=`${row}\n`
					}
				}
			)
			console.log(listText)
			const currentFile:TFile|null=this.app.workspace.getActiveFile();
			if (currentFile!=null) {
				MarkdownRenderer.renderMarkdown(processCodeBlock(listText), el, this.app.vault.getResourcePath(currentFile), this)
			}
			MarkdownPreviewView.renderMarkdown(`![[${diagram}]]`, el, diagram, this);
		}
	)
}

onunload() {

}

	async loadSettings() {
	this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
}

	async saveSettings() {
	await this.saveData(this.settings);
}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: DependencyTreePlugin;

	constructor(app: App, plugin: DependencyTreePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'Settings for my awesome plugin.' });

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
