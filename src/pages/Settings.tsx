import { useState, useRef, useEffect } from 'react';
import { StandardSet, ExpertSet } from '../types';
import updatesInfo from '../data/recentUpdateInfo.json';
import {
  exportAllData,
  downloadExportFile,
  readImportFile,
  importData,
  clearAllData,
  getSettings,
  updateSettings
} from '../utils/storage';

function Settings() {
  const [defaultStandardSet, setDefaultStandardSet] = useState<StandardSet>(StandardSet.STANDARD_III);
  const [defaultExpertSet, setDefaultExpertSet] = useState<ExpertSet>(ExpertSet.NONE);
  const [showClearModal, setShowClearModal] = useState(false);
  const [clearConfirmText, setClearConfirmText] = useState('');
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await getSettings();
      setDefaultStandardSet(settings.defaultDifficulty.standardSet);
      setDefaultExpertSet(settings.defaultDifficulty.expertSet);
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const handleDefaultDifficultyChange = async (
    standardSet: StandardSet,
    expertSet: ExpertSet
  ) => {
    try {
      await updateSettings({
        defaultDifficulty: { standardSet, expertSet }
      });
      setDefaultStandardSet(standardSet);
      setDefaultExpertSet(expertSet);
      showMessage('success', 'Default difficulty updated');
    } catch (error) {
      showMessage('error', 'Failed to update default difficulty:' + error);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      const data = await exportAllData();
      downloadExportFile(data);
      showMessage('success', 'Data exported successfully');
    } catch (error) {
      showMessage('error', 'Failed to export data');
      console.error(error);
    } finally {
      setExporting(false);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setImporting(true);
      const data = await readImportFile(file);
      
      // Ask for import mode
      const mode = window.confirm(
        'Import Mode:\n\n' +
        'OK = MERGE (add to existing data)\n' +
        'Cancel = REPLACE (overwrite all data)\n\n' +
        'Choose wisely!'
      ) ? 'merge' : 'replace';

      if (mode === 'replace') {
        const confirmReplace = window.confirm(
          'WARNING: REPLACE mode will DELETE ALL existing data!\n\n' +
          'This cannot be undone. Are you sure?'
        );
        if (!confirmReplace) {
          showMessage('error', 'Import cancelled');
          return;
        }
      }

      await importData(data, mode);
      showMessage('success', `Data imported successfully (${mode} mode)`);
      
      // Reload page to reflect changes
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      showMessage('error', `Import failed: ${(error as Error).message}`);
      console.error(error);
    } finally {
      setImporting(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClearData = () => {
    setShowClearModal(true);
    setClearConfirmText('');
  };

  const confirmClearData = async () => {
    if (clearConfirmText !== 'DELETE') {
      showMessage('error', 'Please type DELETE to confirm');
      return;
    }

    try {
      setClearing(true);
      await clearAllData();
      setShowClearModal(false);
      showMessage('success', 'All data cleared successfully');
      
      // Reload page after short delay
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      showMessage('error', 'Failed to clear data');
      console.error(error);
    } finally {
      setClearing(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
        <p className="text-gray-600 mt-1">
          Manage your data, preferences, and app information
        </p>
      </div>

      {/* Message Display */}
      {message && (
        <div
          className={`rounded-lg p-4 mb-6 ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-300 text-green-800'
              : 'bg-red-50 border border-red-300 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Data Management & Preferences */}
        <div className="space-y-6">
          {/* Data Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Data Management</h3>
            
            <div className="space-y-4">
              {/* Export */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Export Data</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Download all your data as a JSON file for backup or transfer.
                </p>
                <button
                  onClick={handleExport}
                  disabled={exporting}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 font-medium transition-colors"
                >
                  {exporting ? 'Exporting...' : 'Export All Data'}
                </button>
              </div>

              {/* Import */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-700 mb-2">Import Data</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Import data from a previously exported JSON file.
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  onClick={handleImportClick}
                  disabled={importing}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 font-medium transition-colors"
                >
                  {importing ? 'Importing...' : 'Import Data'}
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  You'll be asked to choose between merge or replace mode.
                </p>
              </div>

              {/* Clear All Data */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-red-700 mb-2">Danger Zone</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Permanently delete all your data. This cannot be undone.
                </p>
                <button
                  onClick={handleClearData}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium transition-colors"
                >
                  Clear All Data
                </button>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Preferences</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Default Difficulty</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Set your preferred difficulty for new games and scenario generation.
                </p>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Standard Set
                    </label>
                    <select
                      value={defaultStandardSet}
                      onChange={(e) =>
                        handleDefaultDifficultyChange(
                          e.target.value as StandardSet,
                          defaultExpertSet
                        )
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={StandardSet.STANDARD}>Standard</option>
                      <option value={StandardSet.STANDARD_II}>Standard II</option>
                      <option value={StandardSet.STANDARD_III}>Standard III</option>
                      <option value={StandardSet.RANDOM}>Random</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expert Set
                    </label>
                    <select
                      value={defaultExpertSet}
                      onChange={(e) =>
                        handleDefaultDifficultyChange(
                          defaultStandardSet,
                          e.target.value as ExpertSet
                        )
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={ExpertSet.NONE}>None</option>
                      <option value={ExpertSet.EXPERT}>Expert</option>
                      <option value={ExpertSet.EXPERT_II}>Expert II</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: App Information */}
        <div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">About</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-2xl font-bold text-red-600 mb-1">
                  The Utility Belt
                </h4>
                <p className="text-sm text-gray-600"> {updatesInfo.updates[0].version} </p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-700 leading-relaxed">
                  An unofficial companion app for the Marvel Champions LCG by Fantasy Flight Games.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-700 mb-2">Open Source</h4>
                <p className="text-sm text-gray-600 mb-3">
                  This app is completely free to use and open source! If you would like to contribute to the project, check out the repo on Github!
                </p>
                <a
                  href="https://github.com/GoldRino456/Utility-Belt-Companion-App"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  View on GitHub
                </a>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-700 mb-2">Disclaimer</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  This is an unofficial, fan-made companion app and is not affiliated with, 
                  endorsed, sponsored, or specifically approved by Fantasy Flight Games. 
                  Marvel Champions: The Card Game and all related properties are trademarks 
                  of their respective owners.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-700 mb-2">Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>✓ Track your collection</li>
                  <li>✓ Log game results</li>
                  <li>✓ Generate random scenarios</li>
                  <li>✓ View statistics and win rates</li>
                  <li>✓ Import/export data</li>
                  <li>✓ All data stored locally</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clear Data Confirmation Modal */}
      {showClearModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-red-600 mb-4">
              Clear All Data
            </h3>
            <p className="text-gray-700 mb-4">
              This will permanently delete:
            </p>
            <ul className="text-sm text-gray-600 mb-4 space-y-1">
              <li>• All collection data</li>
              <li>• All game logs</li>
              <li>• All achievements (when implemented)</li>
            </ul>
            <p className="text-red-600 font-semibold mb-4">
              This action cannot be undone!
            </p>
            <p className="text-sm text-gray-700 mb-2">
              Type <strong>DELETE</strong> to confirm:
            </p>
            <input
              type="text"
              value={clearConfirmText}
              onChange={(e) => setClearConfirmText(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Type DELETE"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmClearData}
                disabled={clearing || clearConfirmText !== 'DELETE'}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400 font-medium"
              >
                {clearing ? 'Clearing...' : 'Clear Data'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
