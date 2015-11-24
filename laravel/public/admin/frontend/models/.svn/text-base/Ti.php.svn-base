<?php

namespace app\models;

use Yii;

/**
 * This is the model class for collection "company".
 *
 * @property \MongoId|string $_id
 * @property mixed $name
 */
class Ti extends \yii\mongodb\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function collectionName()
    {
        return ['niuke', 'ti'];
    }
    
    /**
     * @inheritdoc
     */
    public function attributes()
    {
        return [
            '_id',
            'question',
            'pid',
            'all_answer',
            'really_answer',
            'type'
        ];
    }
}

